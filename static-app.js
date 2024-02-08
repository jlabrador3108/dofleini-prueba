let modules = []
let sub_modules = {}
let count = 0

const getPosition = (id) =>{
    return modules.map(e => e.id).indexOf(id)
}

const limit20 = (value)=>{
    if(value.length >= 20) return true
    return false
    }

export const getModules = () =>{
return modules
}

export const insertModule = (object) =>{
    if(limit20(object.name)){
         return "Nombre mayor a 20 caracteres"
    }

    if(object.sub_nomencladores != undefined){
        if(object.sub_nomencladores.length > 0){
            object.sub_modules = []
            object.sub_nomencladores.map(a=>{
                sub_modules[count] = a.name
                object.sub_modules.push(count)
                count++
            })  
            delete object.sub_nomencladores

        }

    }

    modules.push(object)
    return object
    }

export const deleteModule = (id) =>{
    const pos = getPosition(id)
    modules.splice(pos, 1)
    return modules
    }

export const updateModule = (id, object) =>{
    const pos = getPosition(id)
    modules[pos] = object
    return object
    }




