'use strict'

const alerts = (type='other', message='', duration=3000)=>{
    switch (type) {

        case 'error':
            mdtoast(message, { duration: duration, type: mdtoast.ERROR });
            break;

        case 'success':
            mdtoast(message, { duration: duration, type: mdtoast.SUCCESS });
            break;

        case 'info':
            mdtoast(message, { duration: duration, type: mdtoast.INFO });
            break;

        case 'warning':
            mdtoast(message, { duration: duration, type: mdtoast.WARNING });
            break;

        case 'secondary':
            mdtoast(message, { duration: duration, type: mdtoast.SECONDARY });
            break;

        case 'black':
            mdtoast(message, { duration: duration, type: mdtoast.BLACK });
            break;

        case 'white':
            mdtoast(message, { duration: duration, type: mdtoast.WHITE });
            break;

        case 'other':
            mdtoast(message, { duration: duration });
            break;

        default: mdtoast(message, { duration: duration }); break;
    }
}


