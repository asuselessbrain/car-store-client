const AdminPath = [
    {
        name: "Users",
        path: "get-all-user",
        Component: "GetAllUser"
    },
    {
        name: "Products",
        path: "get-all-products",
        Component: "GetAllProducts"
    },
    {
        name: "Create Product",
        path: "create-product",
        Component: "CreateProduct"
    },
    {
        name: "Update Product",
        children: [
            {
                name: "Update Product 1",
                path: "update-product/1",
                Component: "UpdateProduct"
            },
            {
                name: "Update Product 2",
                path: "update-product/2",
                Component: "UpdateProduct"
            }
        ]
    },
]

// const result = AdminPath.reduce((acc, item) => {
//     if(item.path && item.Component){
//         acc.push({
//             path: item.path,
//             Component: item.Component
//         })
//     }
//     if(item.children){
//         item.children.forEach(children => {
//             acc.push({
//                 path: children.path,
//                 Component: children.Component
//             })
//         })
//     }
//     return acc
// }, [])

const result = AdminPath.reduce((acc, item) => {
    if(item.path && item.name){
        acc.push({
            key: item.path,
            label: item.name
        })
    }
    if(item.children){
        item.children.forEach(children => {
            acc.push({
                key: item.path,
            label: item.name
            })
        })
    }
    return acc
}, [])

console.log(result);