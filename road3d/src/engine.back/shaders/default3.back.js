const VSHADER_SOURCE =
    'attribute vec4 aPosition;\n' +
    'attribute vec4 aColor;\n' +
    'attribute vec2 aVertexTextureCoords;\n' +
    'uniform mat4 uMVMatrix;\n' +
    'uniform mat4 uPMatrix;\n' +
    'varying vec4 vColor;\n' +
    'varying vec2 vTextureCoords;\n' +
    'void main() {\n' +
    '  gl_Position = uPMatrix * uMVMatrix * aPosition;\n' +
    '  vColor = aColor;\n' +
    '  vTextureCoords = aVertexTextureCoords;\n' +
    '}\n';

const FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision highp float;\n' +
    '#endif\n' +
    'uniform sampler2D uSampler;' +
    'uniform bool uUseTexture;\n' +
    'varying vec4 vColor;\n' +
    'varying vec2 vTextureCoords;\n' +
    'void main() {\n' +
    '  if(uUseTexture){\n' +
    '    gl_FragColor = vColor * texture2D(uSampler, vTextureCoords);\n' +
    '  }else{\n' +
    '    gl_FragColor = vColor;\n' +
    '  }\n' +
    '}\n';

export {
    VSHADER_SOURCE,
    FSHADER_SOURCE
}