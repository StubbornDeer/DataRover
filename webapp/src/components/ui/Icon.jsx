import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'; 

/* NOT IN USE YET */

const b = 'user'
const a = solid(b);
function Icon(props) {
    let icon = null;
    /*switch(props.lib){
        case 'fa':
            const style = props.style || 'regular';
            let styleFunc = '';
            switch (style){
                case 'solid':
                    styleFunc = solid('props.icon');
                    break;
                case 'regular':
                    styleFunc = regular('props.icon');
                    break;
                case 'brands':
                    styleFunc = brands('props.icon');
                    break;
            }
            //const iconStyle = styleFunc(props.icon);
            icon = <FontAwesomeIcon icon={styleFunc}  />;
            break;
    }*/
    const styleFunc = solid('user-secret')
    return <FontAwesomeIcon icon={styleFunc} />;
}
export default Icon;