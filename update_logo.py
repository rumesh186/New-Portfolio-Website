svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 240" fill="none">
  <!-- R Character (Transparent Background Vector) -->
  <path d="M 14 28
           L 100 28
           L 122 38
           C 142 50 154 68 154 90
           C 154 112 142 128 126 138
           L 182 208
           L 142 208
           L 92 138
           L 68 126
           C 86 122 102 114 112 102
           C 120 92 124 82 124 72
           C 124 60 116 56 100 56
           L 14 56
           Z" 
        fill="currentColor" />

  <!-- K Character (Transparent Background Vector) -->
  <path d="M 268 28
           L 228 28
           L 168 98
           L 168 124
           L 228 208
           L 268 208
           L 198 111
           Z" 
        fill="currentColor" />
</svg>'''

with open('assets/logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

with open('assets/rk-logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print("Logo SVG files generated with transparent background!")
