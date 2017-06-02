const VSHADER_SOURCE =
    'attribute vec4 aPosition;\n' +
    'attribute vec3 aVertexNormal;\n' +
    'attribute vec4 aColor;\n' +
    'attribute vec2 aVertexTextureCoords;\n' +

    'uniform mat4 uMVMatrix;\n' +
    'uniform mat4 uPMatrix;\n' +
    'uniform mat4 uNMatrix; \n' +

    'uniform vec3 uLightPosition; \n' +

    'varying vec4 vColor;\n' +
    'varying vec2 vTextureCoords;\n' +

    'varying vec3 vNormal;\n' +
    'varying vec3 vLightDir;\n' +
    'varying vec3 vEyeVec;\n' +

    'varying vec4 vFinalColor;\n' +

    'void main() {\n' +

    //Transformed vertex position
    '  vec4 vertex = uMVMatrix * aPosition;\n' +
    //Transformed normal vector [done]
    '  vNormal = vec3(uNMatrix * vec4(aVertexNormal, 0.0));\n' +
    //Light position
    '  vLightDir = vertex.xyz - uLightPosition;\n' +
    //Vector Eye
    '  vEyeVec = -vec3(vertex.xyz);\n' +

    '  vColor = aColor;\n' +
    '  vTextureCoords = aVertexTextureCoords;\n' +
    '  gl_Position = uPMatrix * uMVMatrix * aPosition;\n' +
    '}\n';

const FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision highp float;\n' +
    '#endif\n' +

    //shininess
    'uniform float uShininess;\n' +
    //ambient color
    'uniform vec4 uLightAmbient;\n' +
    //light color
    'uniform vec4 uLightDiffuse;\n' +

    'uniform sampler2D uSampler;\n' +
    'uniform bool uUseTexture;\n' +
    'varying vec4 vColor;\n' +
    'varying vec2 vTextureCoords;\n' +

    'varying vec3 vNormal;\n' +
    'varying vec3 vLightDir;\n' +
    'varying vec3 vEyeVec;\n' +

    'void main() {\n' +

    '  vec3 L = normalize(vLightDir);\n' +
    '  vec3 N = normalize(vNormal);\n' +
    '  float lambertTerm = dot(N,-L);\n' +
    '  vec4 Ia = uLightAmbient;\n' +
    '  vec4 Id = vec4(0.0,0.0,0.0,1.0);\n' +
    '  vec4 Is = vec4(0.0,0.0,0.0,1.0);\n' +

    '  if(lambertTerm > 0.0){\n' +
    '    if(uUseTexture){\n' +
    '      Id = texture2D(uSampler, vTextureCoords) * lambertTerm;\n' +
    '    }else{\n' +
    '      Id = vColor * lambertTerm;\n' +
    '    }\n' +
    '    vec3 E = normalize(vEyeVec);\n' +
    '    vec3 R = reflect(L, N);\n' +
    '    float specular = pow( max(dot(R, E), 0.0), uShininess);\n' +
    '    Is = uLightDiffuse * specular;\n' +
    '  }\n' +

    '  vec4 finalColor = Ia + Id + Is;\n' +
    '  finalColor.a = 1.0;\n' +

    '  if(uUseTexture){\n' +
    '    gl_FragColor =  finalColor;\n' +
    '  }else{\n' +
    '    gl_FragColor = vColor;\n' +
    '  }\n' +
    '}\n';

export {
    VSHADER_SOURCE,
    FSHADER_SOURCE
}