
import { combineReducers, } from "redux";
import { createSelectorHook, } from "react-redux";
import { createReducer, createAction, } from '@reduxjs/toolkit'
import produce from "immer"


const initialStateCartCount = {
    cartCount: 0,
    cartTotal: 0,
}

const CartCount = (state = initialStateCartCount, action) => {
    if (action.type === 'SET_CART_COUNT') {
        return {
            ...state,
            cartCount: action.cartCount,
            cartTotal: action.cartTotal,
        }
    }
    return state;
}

const InitialCompanyData = {
    companyData: [],
};

const CompanyData = (state = InitialCompanyData, action) => {
    if (action.type === 'SET_COMPANY_DATA') {
        return {
            ...state,
            companyData: action.companyData,
        }
    }
    return state;
}


const initialUserData = {
    userData: [],
};

const UserData = (state = initialUserData, action) => {
    if (action.type === 'SET_USER_DATA') {
        return {
            ...state,
            userData: action.userData,
        }
    }
    return state;
}

const initialRegionAvailability = {
    regionAvailability: null,

}

const RegionAvailability = (state = initialRegionAvailability, action) => {
    if (action.type === 'SET_REGION_AVAILABILITY') {
        return {
            ...state,
            regionAvailability: action.regionAvailability,
        }
    }
    return state;
}

const initialIsChangeNominal = {
    isChangeNominal: false,

}

const IsChangeNominal = (state = initialIsChangeNominal, action) => {
    if (action.type === 'SET_IS_CHANGE_NOMINAL') {
        return {
            ...state,
            isChangeNominal: action.isChangeNominal,
        }
    }
    return state;
}

const initialStateDetailCart = {
    detailCart: [],
    cartLength: 0,
    cartTotal: 0,
}


// const DetailCart = (state = initialStateDetailCart, action) => {
//     if (action.type === "SET_DETAIL_CART") {
//         return {
//             ...state,
//             detailCart: action.detailCart,
//         }
//     }
//     if (action.type === "PUSH_DETAIL_CART") {
//         return {
//             ...state,
//             detailCart: [...state.detailCart, action.detailCart]
//         }
//     }
//     if (action.type === "UPDATE_DETAIL_CART") {
//         return {
//             ...state,
//             detailCart: [
//                 ...state.detailCart.slice(0, action.index),
//                 { ...state.detailCart[action.index], jumlah_pesanan: action.jumlahPesanan },
//                 ...state.detailCart.slice(action.index + 1)
//             ]
//         }
//     }
//     return state;
// }


const DetailCart = (state = initialStateDetailCart, action) =>
    produce(state, draft => {
        switch (action.type) {
            case 'SET_DETAIL_CART':
                draft.detailCart = action.detailCart;
                draft.cartLength = action.cartLength;
                draft.cartTotal = action.cartTotal;
                console.log('action.cartLength', action.cartLength);

                break;
            case 'PUSH_DETAIL_CART':
                draft.detailCart.push(action.detailCart);
                break;
            case 'UPDATE_DETAIL_CART':
                draft.detailCart[action.index].qty = action.qty;
                break;
            default:
                break;
        }

    })



const initialSelectedArea = {
    selectedArea: [],
    indexSelectedArea: 0,
};

const SelectedArea = (state = initialSelectedArea, action) => {
    if (action.type === 'SET_AREA') {
        return {
            ...state,
            selectedArea: action.selectedArea,
            indexSelectedArea: action.indexSelectedArea
        }
    }
    return state;
}



const initialSelectedBank = {
    selectedBank: [],
    indexSelectedBank: 0,
};

const SelectedBank = (state = initialSelectedBank, action) => {
    if (action.type === 'SET_BANK') {
        return {
            ...state,
            selectedBank: action.selectedBank,
            indexSelectdBank: action.indexSelectedBank
        }
    }
    return state;
}

const initialSelectedAddress = {
    selectedAddress: [],
    indexSelectedAddress: 0,
};

const SelectedAddress = (state = initialSelectedAddress, action) => {
    if (action.type === 'SET_SELECTED_ADDRESS') {
        return {
            ...state,
            selectedAddress: action.selectedAddress,
            indexSelectedAddress: action.indexSelectedAddress
        }
    }
    return state;
}


const initialNotificationData = {
    notificationData: [],
    notifCount: null,
};
const NotificationData = (state = initialNotificationData, action) => {
    if (action.type === 'SET_NOTIFICATION_DATA') {
        return {
            ...state,
            notificationData: action.notificationData,
            notifCount: action.notifCount,
        }
    }
    return state;
}

const InitialNewTransactions = {
    newTransactions: [],
    trxCount: null,
};

const NewTransactions = (state = InitialNewTransactions, action) => {
    if (action.type === 'SET_NEW_TRANSACTIONS') {
        return {
            ...state,
            newTransactions: action.newTransactions,
            trxCount: action.trxCount,
        }
    }
    return state;
}


const InitialCategoryData = {
    categoryData: [],
    selectedCategory: [],
    indexSelectedCategory: 0,
};

const CategoryData = (state = InitialCategoryData, action) => {
    if (action.type === 'SET_CATEGORY_DATA') {
        return {
            ...state,
            categoryData: action.categoryData,
        }
    }
    if (action.type === 'SET_SELECTED_CATEGORY') {
        return {
            ...state,
            selectedCategory: action.selectedCategory,
            indexSelectedCategory: action.indexSelectedCategory,
        }
    }
    return state;
}

const initialSelectedDate = {
    indexSelectedDate: null,
    selectedDate: {},
};

const SelectedDate = (state = initialSelectedDate, action) => {
    if (action.type === 'SET_SELECTED_DATE') {
        return {
            ...state,
            selectedDate: action.selectedDate,
            indexSelectedDate: action.indexSelectedDate,
        }
    }
    return state;
}


const initialDeliveryDateList = {
    deliveryDateList: [],
};

const DeliveryDateList = (state = initialDeliveryDateList, action) => {
    if (action.type === 'SET_DELIVERY_DATE_LIST') {
        return {
            ...state,
            deliveryDateList: action.deliveryDateList,
        }
    }
    return state;
}

const initialIsMaintenance = {
    isMaintenance: false,
};

const IsMaintenance = (state = initialIsMaintenance, action) => {
    if (action.type === 'SET_IS_MAINTENANCE') {
        return {
            ...state,
            isMaintenance: action.isMaintenance,
        }
    }
    return state;
}


const reducer = combineReducers({
    CartCount,
    CompanyData,
    IsChangeNominal,
    DetailCart,
    UserData,
    SelectedArea,
    SelectedBank,
    NotificationData,
    NewTransactions,
    RegionAvailability,
    CategoryData,
    SelectedDate,
    DeliveryDateList,
    IsMaintenance,
    SelectedAddress
})

export default reducer;