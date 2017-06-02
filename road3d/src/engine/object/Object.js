import utility from '../tools/utility';

class OBJ {
    constructor(GL, obj) {
        this.GL = GL;
        this.gl = GL.gl;
        this.obj = obj = obj || {}
        this.operate = [];
        this.opearteID = 0;
        this.opearteBuild = {};
        this.color = utility.colorTransform(obj.color || '#FFF');
    }

    translate(x, y, z) {
        let id = this.opearteID = this.opearteID;
        this.operate.push({
            id: id++,
            name: 'translate',
            value: [x || 0, y || 0, z || 0]
        })
        return this;
    }

    // useage
    // rotate(30,'x')
    // rotate(30,'y')
    // rotate(30,'z')
    // rotate(30,[1,1,0])
    rotate(rad, axis) {
        let _axis = null;
        if (axis instanceof Array && axis.length == 3) {
            _axis = axis;
        } else {
            switch (axis) {
                case 'x':
                    _axis = [1, 0, 0]
                    break;
                case 'y':
                    _axis = [0, 1, 0]
                    break;
                case 'z':
                    _axis = [0, 0, 1]
                    break;
            }
        }

        if (_axis) {
            let id = this.opearteID = this.opearteID;
            this.operate.push({
                id: id++,
                name: 'rotate',
                value: [rad, _axis]
            })
        }
        return this;
    }

    scale(x, y, z) {
        let id = this.opearteID = this.opearteID;
        this.operate.push({
            id: id++,
            name: 'scale',
            value: [x || 1, y || 1, z || 1]
        })
        return this;
    }

    updateOpearte() {
        let mvMatrix = this.GL.camera.mvMatrix;
        if (this.opearteBuild.ID === this.opearteID && this.opearteBuild.start === mvMatrix.toString()) {
            mvMatrix = this.opearteBuild.result
        } else {
            let start = mvMatrix.toString();
            for (let i in this.operate) {
                let type = this.operate[i].name;
                let value = this.operate[i].value;
                let mvNMatrix = mat4.create();
                switch (type) {
                    case 'translate':
                        mat4.translate(mvNMatrix, mvMatrix, value)
                        mvMatrix = mvNMatrix;
                        break;
                    case 'rotate':
                        mat4.rotate(mvNMatrix, mvMatrix, value[0], value[1])
                        mvMatrix = mvNMatrix;
                        break;
                    case 'scale':
                        mat4.scale(mvNMatrix, mvMatrix, value)
                        mvMatrix = mvNMatrix;
                        break;
                }
            }
            this.opearteBuild = {
                ID: this.opearteID,
                result: mvMatrix,
                start: start,
            }
        }
    }
}

export default OBJ;