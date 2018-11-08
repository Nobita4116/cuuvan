// import * as types from '../constants/ActionTypes';

// var item = [
//     {name: 'nguyen van a', phone: '0123456789', adress: 'thanh xuân- hà nội'},
//     {name: 'nguyen van a', phone: '0123456789', adress: 'thanh xuân- hà nội'},
//     {name: 'nguyen van a', phone: '0123456789', adress: 'thanh xuân- hà nội'},
// ]

// var findIndex = (item, id) => {
//     var result = -1;
//     item.forEach((item, index) => {
//         // index chay theo vong for bat dau tu 0.
//         if (item.id === id) {
//             result = index;
//         }
//     });
//     return result;
// }

// export default function data(state=item, action) {
    
//     var index = -1;
//     var item = action ? action.item : ''; 
//     var id = action.item ? action.item.id : '';
//     switch (action.type) {
//         case types.DELETE_PRODUCT:
//             index = findIndex(state, id);
//             state.splice(index, 1);
//             return [...state];
//         case types.UPDATE_PRODUCT:
//             index = findIndex(state, id);
//             state[index] = item;
//             return [...state];
//         case types.ADD_PRODUCT:
//             state.unshift(action.item);
//             return [...state];
//         case types.FETCH_PRODUCT:
//             state = action.data;
//             return state;
//         default:
//             return [...state];
//     }
// }