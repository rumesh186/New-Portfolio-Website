import math

def generate_rk_svg():
    # Grid parameters
    # Baseline: y=200, Topline: y=30, Height=170
    # Stroke thickness = 26
    # 45-degree angle -> dx = dy
    
    # R coordinates
    # Top bar: y from 30 to 56
    # Left edge of top bar: x=20
    # Top curve: arcs from (100, 30) down to (156, 86) and around to (100, 142)
    # Inner loop: y from 56 to 116, inner curve from (100, 56) to (130, 86) to (100, 116)
    # Left chevron at waist: outer point at (74, 126), connects from (100, 116) down-left to (74, 126), then down-right to (100, 142)
    # Wait, let's look at the leg of R:
    # Outer leg: from (150, 142) down-right at 45 deg to (208, 200)
    # Bottom cut: (208, 200) to (171, 200)
    # Inner leg: from (171, 200) up-left at 45 deg to (113, 142)
    
    # Let's craft the exact SVG
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" fill="none">
  <!-- R Character -->
  <path d="M 20 32
           L 108 32
           C 142 32 166 54 166 88
           C 166 114 150 134 126 142
           L 184 208
           L 147 208
           L 96 150
           L 78 128
           L 96 128
           C 118 128 134 112 134 88
           C 134 66 120 58 102 58
           L 20 58
           Z" 
        fill="currentColor" />
  <!-- K Character -->
  <path d="M 276 32
           L 239 32
           L 182 98
           L 182 120
           L 242 208
           L 279 208
           L 208 108
           Z" 
        fill="currentColor" />
</svg>'''
    return svg

with open('assets/rk-logo.svg', 'w', encoding='utf-8') as f:
    f.write(generate_rk_svg())

print("Generated assets/rk-logo.svg")
