import fitz # PyMuPDF
import os, sys, json, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r'c:\Users\wjdgn\Desktop\작업\식구들 명단1.pdf'
doc = fitz.open(pdf_path)

members = []

for page_idx in range(len(doc)):
    page = doc[page_idx]
    pix = page.get_pixmap(dpi=200) # Render high-res 200 DPI page image
    page_img = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
    
    pw, ph = page.rect.width, page.rect.height
    scale_x = pix.width / pw
    scale_y = pix.height / ph
    
    blocks = page.get_text('blocks')
    member_blocks = [b for b in blocks if '이름' in b[4]]
            
    for b in member_blocks:
        bx0, by0, bx1, by1, txt = b[0], b[1], b[2], b[3], b[4]
        
        info = {
            'name': '',
            'age': '',
            'region': '',
            'job': '',
            'assemblyMonth': '',
            'inviter': '',
            'inviterRelation': '',
            'youtube': '',
            'testimony': ''
        }
        
        # Extract name
        m_name = re.search(r'이름\s*[:;]?\s*([^\n나지역직집초간]+)', txt)
        if m_name:
            info['name'] = m_name.group(1).strip()
            
        # Extract age
        m_age = re.search(r'나이\s*[:;]?\s*([^\n지역직집초간]+)', txt)
        if m_age:
            info['age'] = m_age.group(1).strip()
            if not info['age'].endswith('세') and info['age'].isdigit():
                info['age'] += '세'
                
        # Extract region
        m_region = re.search(r'지역\s*[:;]?\s*([^\n직집초간]+)', txt)
        if m_region:
            info['region'] = m_region.group(1).strip()
            
        # Extract job
        m_job = re.search(r'직업\s*[:;]?\s*([^\n집초간]+)', txt)
        if m_job:
            info['job'] = m_job.group(1).strip()
            
        # Extract assemblyMonth
        m_asm = re.search(r'집회\s*참석\s*(?:일자|월)?\s*[:;]?\s*([^\n초간]+)', txt)
        if m_asm:
            info['assemblyMonth'] = m_asm.group(1).strip()
            
        # Extract inviter
        m_inv = re.search(r'초대자\s*[:;]?\s*([^\n초간]+)', txt)
        if m_inv:
            info['inviter'] = m_inv.group(1).strip()
            
        # Extract inviterRelation
        m_rel = re.search(r'초대자와의\s*관계\s*[:;]?\s*([^\n간]+)', txt)
        if m_rel:
            info['inviterRelation'] = m_rel.group(1).strip()
            
        # Extract youtube/link
        m_link = re.search(r'https?://[^\s]+', txt)
        if m_link:
            info['youtube'] = m_link.group(0).strip()
            
        # Crop photo on the left of text block bx0
        px0 = max(0, bx0 - 200)
        py0 = max(0, by0 - 10)
        px1 = max(0, bx0 - 5)
        py1 = min(ph, by1 + 15)
        
        img_crop = page_img.crop((
            int(px0 * scale_x),
            int(py0 * scale_y),
            int(px1 * scale_x),
            int(py1 * scale_y)
        ))
        
        canvas = Image.new('RGB', (400, 400), (255, 255, 255))
        if img_crop.width > 20 and img_crop.height > 20:
            scale = min(400 / img_crop.width, 400 / img_crop.height)
            nw = int(img_crop.width * scale)
            nh = int(img_crop.height * scale)
            resized = img_crop.resize((nw, nh), Image.Resampling.LANCZOS)
            ox = (400 - nw) // 2
            oy = (400 - nh) // 2
            canvas.paste(resized, (ox, oy))
            
        photo_filename = f'pdf_member_{len(members)+1}.png'
        photo_path = os.path.join(r'c:\Users\wjdgn\Desktop\작업\ethiopia_gospel_archive\images\members', photo_filename)
        canvas.save(photo_path, quality=98)
        
        info['photo'] = f'images/members/{photo_filename}'
        info['id'] = f'pdf-mem-{len(members)+1}'
        info['category'] = 'saved'
        
        if info['name']:
            members.append(info)
            print(f"Page {page_idx+1}: {info['name']} ({info['age']}, {info['region']}) -> {photo_filename}")

print(f'=== TOTAL MEMBERS PARSED FROM PDF: {len(members)} ===')
with open('parsed_pdf_members.json', 'w', encoding='utf-8') as f:
    json.dump(members, f, ensure_ascii=False, indent=2)
