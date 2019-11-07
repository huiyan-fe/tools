const VSHADER_SOURCE =
    'attribute vec3 aPosition;\n' +
    'attribute vec4 aColor;\n' +
    'attribute vec2 aVertexTextureCoords;\n' +
    'uniform mat4 uMVMatrix;\n' +
    'uniform mat4 uPMatrix;\n' +
    'varying vec4 vColor;\n' +
    'varying vec2 vTextureCoords;\n' +
    'void main() {\n' +
    '  gl_Position = uPMatrix * uMVMatrix * vec4(aPosition, 1.0);\n' +
    '  vTextureCoords = aVertexTextureCoords;\n' +
    '  vColor = aColor;\n' +
    '}\n';

const FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision highp float;\n' +
    '#endif\n' +
    'uniform sampler2D uSampler;' +
    'varying vec4 vColor;\n' +
    'varying vec2 vTextureCoords;\n' +
    'uniform bool uUseTexture;\n' +
    'void main() {\n' +
    '  if(uUseTexture){\n' +
    '    gl_FragColor = vColor * texture2D(uSampler, vTextureCoords);\n' +
    '  }else{\n' +
    '    gl_FragColor = vColor;\n' +
    '  }\n' +
    '}\n';


const shaders = {
    VSHADER_SOURCE,
    FSHADER_SOURCE
}


export default shaders;