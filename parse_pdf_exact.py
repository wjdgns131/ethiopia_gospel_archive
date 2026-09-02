import fitz # PyMuPDF
import os, sys, json, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r'c:\Users\wjdgn\Desktop\작업\식구들 명단1.pdf'
doc = fitz.open(pdf_path)

members = []

for page_idx in range(len(doc)):
    page = doc[page_idx]
    # Render at 300 DPI for high quality photos
    pix = page.get_pixmap(dpi=300)
    page_img = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
    
    pw, ph = page.rect.width, page.rect.height
    scale_x = pix.width / pw
    scale_y = pix.height / ph
    
    blocks = page.get_text('blocks')
    member_blocks = [b for b in blocks if '이름' in b[4]]
    
    # Sort blocks vertically top-to-bottom then left-to-right
    member_blocks.sort(key=lambda b: (b[1], b[0]))
            
    for b in member_blocks:
        bx0, by0, bx1, by1, txt = b[0], b[1], b[2], b[3], b[4]
        
        info = {
            'id': f'pdf-mem-{len(members)+1}',
            'name': '',
            'category': 'saved',
            'age': '',
            'region': '',
            'job': '',
            'assemblyMonth': '',
            'inviter': '',
            'inviterRelation': '',
            'photo': '',
            'youtube': '',
            'testimony': ''
        }
        
        # Clean text
        txt_clean = txt.replace('사역', '봉사').replace('결신', '구원')
        
        # Extract name
        m_name = re.search(r'이름\s*[:;]?\s*([^\n나지역직집초간]+)', txt_clean)
        if m_name:
            info['name'] = m_name.group(1).strip()
            
        # Extract age
        m_age = re.search(r'나이\s*[:;]?\s*([^\n지역직집초간]+)', txt_clean)
        if m_age:
            raw_age = m_age.group(1).strip()
            num_match = re.search(r'\d+', raw_age)
            if num_match:
                info['age'] = f"{num_match.group(0)}세"
            else:
                info['age'] = raw_age
                
        # Extract region
        m_region = re.search(r'지역\s*[:;]?\s*([^\n직집초간]+)', txt_clean)
        if m_region:
            info['region'] = m_region.group(1).strip()
            
        # Extract job
        m_job = re.search(r'직업\s*[:;]?\s*([^\n집초간]+)', txt_clean)
        if m_job:
            info['job'] = m_job.group(1).strip()
            
        # Extract assemblyMonth
        m_asm = re.search(r'집회\s*참석\s*(?:일자|월)?\s*[:;]?\s*([^\n초간]+)', txt_clean)
        if m_asm:
            info['assemblyMonth'] = m_asm.group(1).strip()
            
        # Extract inviter
        m_inv = re.search(r'초대자\s*[:;]?\s*([^\n초간]+)', txt_clean)
        if m_inv:
            info['inviter'] = m_inv.group(1).strip()
            
        # Extract inviterRelation
        m_rel = re.search(r'초대자와의\s*관계\s*[:;]?\s*([^\n간]+)', txt_clean)
        if m_rel:
            info['inviterRelation'] = m_rel.group(1).strip()
            
        # Extract youtube/link
        m_link = re.search(r'https?://[^\s]+', txt_clean)
        if m_link:
            info['youtube'] = m_link.group(0).strip()
            
        # Crop photo box from left of text block
        # Photo is to the left of bx0 (width ~ 160-190pt)
        px0 = max(0, bx0 - 180)
        py0 = max(0, by0 - 8)
        px1 = max(0, bx0 - 4)
        py1 = min(ph, by1 + 12)
        
        img_crop = page_img.crop((
            int(px0 * scale_x),
            int(py0 * scale_y),
            int(px1 * scale_x),
            int(py1 * scale_y)
        ))
        
        # 400x400 Pure White Canvas
        canvas = Image.new('RGB', (400, 400), (255, 255, 255))
        if img_crop.width > 30 and img_crop.height > 30:
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
        
        if info['name']:
            members.append(info)
            print(f"[{len(members)}] {info['name']} ({info['region']}, {info['age']}) -> {photo_filename}")

print(f'\n=== TOTAL PDF MEMBERS EXTRACTED: {len(members)} ===')

# Save as JSON and JS data
with open('parsed_pdf_members.json', 'w', encoding='utf-8') as f:
    json.dump(members, f, ensure_ascii=False, indent=2)

print('Saved parsed_pdf_members.json successfully!')
