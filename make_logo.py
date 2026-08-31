import os

svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290 230" fill="none">
  <!-- R Glyph -->
  <path d="M 16 32
           L 104 32
           C 122 32 138 42 148 56
           C 156 68 160 82 160 96
           C 160 114 150 130 134 140
           L 182 208
           L 146 208
           L 96 142
           C 92 136 86 132 78 132
           L 66 122
           C 82 118 96 112 104 104
           C 112 96 116 86 116 76
           C 116 64 108 58 96 58
           L 16 58
           Z" 
        fill="currentColor" />
        
  <!-- K Glyph -->
  <path d="M 274 32
           L 238 32
           L 176 96
           L 176 122
           L 238 208
           L 274 208
           L 204 109
           Z" 
        fill="currentColor" />
</svg>"""

with open('assets/logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

with open('assets/rk-logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print("Saved assets/logo.svg and assets/rk-logo.svg")
