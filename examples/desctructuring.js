person = {
    name:'Alice', 
    address:{ street:'Sezamkowa', city:'Wwa' }, 
    reviews:[100,50,120] 
}

getPersonInfo = person => {
    var { 
        name, 
        address:{ 
            street:address_street, 
            ...restAddress 
        }, 
        bio = 'No BIO',
        company:{ name: companyName } = {name:'No company'},
        reviews:[ review, review2 ] 
    } = person ;

    return `${name} - ${address_street} ${restAddress.city} - ${bio} - ${companyName} [${review}]`;
}

getPersonInfo(person);

/// ===========
person = {
    name:'Alice', 
    address:{ street:'Sezamkowa', city:'Wwa' }, 
    reviews:[100,50,120] 
}

getPersonInfo = ({ 
    name, 
    address:{ 
        street:address_street, 
        ...restAddress 
    }, 
    bio = 'No BIO',
    company:{ name: companyName } = {name:'No company'},
    reviews:[ review, review2 ] 
}) => `${name} - ${address_street} ${restAddress.city} - ${bio} - ${companyName} [${review}]`;


getPersonInfo(person);
/// ===========

person = {
    name:'Alice', 
    address:{ street:'Sezamkowa', city:'Wwa' }, 
    reviews:[100,50,120] 
}

getPersonInfo = ({ 
    name, 
    address:{ 
        street:address_street, 
        ...restAddress 
    }, 
    bio = 'No BIO',
    company:{ name: companyName } = {name:'No company'},
    reviews:[ review, review2 ] 
// }) => `${name} - ${address_street} ${restAddress.city} - ${bio} - ${companyName} [${review}]`;
}) => ({
    name, company:{name:companyName}, bio, review, address:{ street: address_street, ...restAddress }
})


getPersonInfo(person);