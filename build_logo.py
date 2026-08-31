# Python script to construct the exact vector SVG matching the second RK logo
svg_code = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 220" fill="none">
  <!-- R Character -->
  <path d="M 10 20
           L 78 20
           C 92 20 106 28 114 40
           C 122 52 126 66 126 80
           C 126 96 118 110 104 120
           L 156 195
           L 124 195
           L 78 128
           C 74 124 70 120 62 120
           L 52 110
           C 66 106 78 100 86 92
           C 92 84 96 74 96 64
           C 96 52 90 44 78 44
           L 10 44
           Z"
        fill="currentColor" />

  <!-- K Character -->
  <path d="M 244 20
           L 212 20
           L 154 86
           L 154 112
           L 212 195
           L 244 195
           L 180 102
           Z"
        fill="currentColor" />
</svg>'''

with open('assets/rk-logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_code)

print("Generated assets/rk-logo.svg")
