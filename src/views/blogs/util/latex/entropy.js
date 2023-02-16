export default {
   entropy: `$$\\mathbb{H}(X) \\triangleq - \\sum_{x\\in X}p(X=x)\\log_2{p(X=x)}= -\\mathbb{E}_{X\\sim\\,{p}}[\\log_2{p(X)}]$$`,
   entropySelfInformation: `$$\\mathbb{H}(X) \\triangleq \\sum_{x\\in X}p(X=x)I(X=x)= \\mathbb{E}_{X\\sim\\,{p}}[I(X)]$$`,
   uniform: `$$\\mathbb{H}(X) = - \\sum_{x\\in X}\\frac{1}{X}\\log_2{\\frac{1}{X}} = - \\log_2{\\frac{1}{X}} = \\log_2{X}$$`,
   uniformThree: `$$\\mathbb{H}(X) = -\\Bigl(\\frac{1}{3}\\log_2{\\frac{1}{3}}+\\frac{1}{3}\\log_2{\\frac{1}{3}}+\\frac{1}{3}\\log_2{\\frac{1}{3}}\\Bigr) = 1.58496\\dots\\text{bits}$$`,
   uniformBernoulli: `$$\\mathbb{H}(X) = \\Bigl(\\frac{1}{2}\\log_2{\\frac{1}{2}}+\\frac{1}{2}\\log_2{\\frac{1}{2}}\\Bigr) = 1\\,\\text{bit}$$`,
   unfairBernoulli: `$$\\mathbb{H}(X) - \\Bigl(\\frac{4}{5}\\log_2{\\frac{4}{5}}+\\frac{1}{5}\\log_2{\\frac{1}{5}}\\Bigr) = 0.72192\\dots\\text{bits}$$`,
   extremeBernoulli: `$$\\mathbb{H}(X) - \\Bigl(\\frac{19}{20}\\log_2{\\frac{19}{20}}+\\frac{1}{20}\\log_2{\\frac{1}{20}}\\Bigr) = 0.28639\\dots\\text{bits}$$`,
   crossEntropy: `$$\\mathbb{H}(p, q) \\triangleq - \\sum_{x\\in X}p(x)\\log_2{q(x)}= -\\mathbb{E}_{X\\sim\\,{p}}[\\log_2{q(X)}] = \\mathbb{E}_{X\\sim\\,{p}}[I_{X\\sim\\,{q}}(X)]$$`,
   crossEntropyExample1: `\\begin{align}
   \\mathbb{H}(p,q) & = -\\Bigl(0.15\\log_2{0.25}+0.30\\log_2{0.10}+0.20\\log_2{0.40}+0.35\\log_2{0.25}\\Bigr) \\\\
      & = 2.26096\\dots\\text{bits}
   \\end{align}`,
   crossEntropyExample2: `\\begin{align}
   \\mathbb{H}(q,p) & = -\\Bigl(0.25\\log_2{0.15}+0.10\\log_2{0.30}+0.40\\log_2{0.20}+0.25\\log_2{0.35}\\Bigr) \\\\
      & = 2.16535\\dots\\text{bits}
   \\end{align}`,
   crossEntropyExample4: `\\begin{align}
   \\mathbb{H}(p) & = -\\Bigl(0.15\\log_2{0.15}+0.30\\log_2{0.30}+0.20\\log_2{0.20}+0.35\\log_2{0.35}\\Bigr) \\\\
      & = 1.92612\\dots\\text{bits}
   \\end{align}`,
   crossEntropyExample3: `\\begin{align}
   \\mathbb{H}(p,z) & = -\\Bigl(0.15\\log_2{0.17}+0.30\\log_2{0.28}+0.20\\log_2{0.20}+0.35\\log_2{0.35}\\Bigr) \\\\
      & = 1.92889\\dots\\text{bits}
   \\end{align}`,
   jointEntropy: `$$\\mathbb{H}(X, Y) \\triangleq -\\sum_{x,\\,y}p(x,y)\\log_2{p(x,y)}$$`,
   jointEntropy2: `\\begin{align}
   \\mathbb{H}(X, Y) & = -\\Bigl(\\frac{1}{6}\\log_2{\\frac{1}{6}}+\\frac{2}{6}\\log_2{\\frac{2}{6}}+\\frac{1}{6}\\log_2{\\frac{1}{6}}+\\frac{2}{6}\\log_2{\\frac{2}{6}}\\Bigr) \\\\
      & = 1.91829\\dots\\text{bits} \\lt \\mathbb{H}(X) + \\mathbb{H}(Y)
   \\end{align}`,
   jointEntropy3: `\\begin{align}
   \\mathbb{H}(X) & = -\\Bigl(\\frac{3}{6}\\log_2{\\frac{3}{6}}+\\frac{3}{6}\\log_2{\\frac{3}{6}}\\Bigr) \\\\
      & = 1\\,\\text{bit}
   \\end{align}`,
   jointEntropy4: `\\begin{align}
   \\mathbb{H}(Y) & = -\\Bigl(\\frac{2}{6}\\log_2{\\frac{2}{6}}+\\frac{4}{6}\\log_2{\\frac{4}{6}}\\Bigr) \\\\
      & = 0.91829\\dots\\text{bits}
   \\end{align}`,
   conditionalEntropy1: `\\begin{align}
   \\mathbb{H}(Y\\,|\\,X) & \\triangleq\\mathbb{H}(X, Y) - \\mathbb{H}(X)\\tag{6.1} \\\\[2ex]
      & = -\\sum_{x,\\,y}p(x,y)\\log_2{p(x,y)} + \\sum_{x}p(x)\\log_2{p(x)}\\tag{6.2} \\\\[2ex]
      & = -\\sum_{x,\\,y}p(x,y)\\log_2{p(x,y)} + \\sum_{x,\\,y}p(x, y)\\log_2{p(x)}\\tag{6.3} \\\\[2ex]
      & = -\\sum_{x,\\,y}p(x,y)\\log_2{p(x,y)} - \\sum_{x,\\,y}p(x, y)\\log_2{\\frac{1}{p(x)}}\\tag{6.3} \\\\[2ex]
   \\mathbb{H}(Y\\,|\\,X) & \\triangleq -\\sum_{x,\\,y}p(x,y)\\log_2{\\frac{p(x,y)}{p(x)}}\\tag{6.4} \\\\[2ex]
   \\mathbb{H}(Y\\,|\\,X) & \\triangleq -\\sum_{x,\\,y}p(x,y)\\log_2{p(y\\,|\\,x)}\\tag{6.5} \\\\[2ex]
      & = -\\sum_{x,\\,y}p(y\\,|\\,x)p(x)\\log_2{p(y\\,|\\,x)}\\tag{6.6} \\\\[2ex]
      & = -\\sum_{x}\\sum_{y}p(y\\,|\\,x)p(x)\\log_2{p(y\\,|\\,x)}\\tag{6.7} \\\\[2ex]
      & = -\\sum_{x}p(x)\\sum_{y}p(y\\,|\\,x)\\log_2{p(y\\,|\\,x)}\\tag{6.8} \\\\[2ex]
      & = \\mathbb{E}_{X\\sim\\,{p}(x)}[-\\sum_{y}p(y\\,|\\,x)\\log_2{p(y\\,|\\,x)}]\\tag{6.9} \\\\[2ex]
   \\mathbb{H}(Y\\,|\\,X) & \\triangleq \\mathbb{E}_{X\\sim\\,{p}(x)}[\\mathbb{H}(p(Y\\,|\\,X))]\\tag{7.0} \\\\[2ex]
   \\end{align}`,
   conditionalEntropy2: `\\begin{align}
   \\mathbb{H}(Y\\,|\\,X) & = \\mathbb{H}(X, Y) - \\mathbb{H}(X) \\\\[2ex]
      & = -\\Bigl(\\frac{1}{6}\\log_2{\\frac{1}{6}}+\\frac{2}{6}\\log_2{\\frac{2}{6}+\\frac{2}{6}\\log_2{\\frac{2}{6}}}+\\frac{1}{6}\\log_2{\\frac{1}{6}}\\Bigr) - \\Bigl(\\frac{3}{6}\\log_2{\\frac{3}{6}}+\\frac{3}{6}\\log_2{\\frac{3}{6}}) \\\\[2ex]
      & = 0.91829\\dots\\text{bits}
   \\end{align}`,
   conditionalEntropy3: `\\begin{align}
   \\mathbb{H}(Y\\,|\\,X) & = -\\sum_{x,\\,y}p(x,y)\\log_2{\\frac{p(x,y)}{p(x)}} = -\\sum_{x,\\,y}p(x,y)\\log_2{p(y\\,|\\,x)} \\\\[2ex]
      & = -\\Bigl(\\frac{1}{6}\\log_2{\\frac{1/6}{3/6}}+\\frac{2}{6}\\log_2{\\frac{2/6}{3/6}}+\\frac{2}{6}\\log_2{\\frac{2/6}{3/6}}+\\frac{1}{6}\\log_2{\\frac{1/6}{3/6}}\\Bigr) \\\\[2ex]
      & = 0.91829\\dots\\text{bits}
   \\end{align}`,
   conditionalEntropy4: `\\begin{align}
   \\mathbb{H}(Y\\,|\\,X) & =\\mathbb{E}_{X\\sim\\,{p}(x)}[\\mathbb{H}(p(Y\\,|\\,X))] \\\\[2ex]
      & = -\\sum_{x}p(x)\\sum_{y}p(y\\,|\\,x)\\log_2{p(y\\,|\\,x)} \\\\[2ex]
      & = -\\sum_{x}p(x)\\sum_{y}\\frac{p(y,x)}{p(x)}\\log_2{\\frac{p(y,x)}{p(x)}} \\\\[2ex]
      & = -\\Bigl(\\frac{3}{6}\\Bigl(\\frac{1/6}{3/6}\\log_2{\\frac{1/6}{3/6}}+\\frac{2/6}{3/6}\\log_2{\\frac{2/6}{3/6}}\\Bigr)+\\frac{3}{6}\\Bigl(\\frac{2/6}{3/6}\\log_2{\\frac{2/6}{3/6}}+\\frac{1/6}{3/6}\\log_2{\\frac{1/6}{3/6}}\\Bigr)\\Bigr) \\\\[2ex]
      & = 0.91829\\dots\\text{bits}
   \\end{align}`,
}