import mongoose from "mongoose";

const uri =
  "mongodb+srv://user1:gahjUjYcXGFGTJ52@cluster0.mjbgypy.mongodb.net/";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const Module = mongoose.model(
  "module",
  mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
      },
      description: String,
    },
    { timestamps: true }
  )
);

const Sub_Module = mongoose.model(
  "sub_module",
  mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
      },
      description: String,
      modules: {
        type: [mongoose.Schema.Types.ObjectId],
        require: true,
      },
    },
    { timestamps: true }
  )
);

// const getPosition = (id) =>{
//     return modules.map(e => e.id).indexOf(id)
// }

const limit20 = (value) => {
  if (value.length >= 20) return true;
  return false;
};

export const getModules = async () => {
  return await Module.find();
};

export const getSubModules = async () => {
  return await Sub_Module.find();
};

export const insertModule = (object) => {
  if (limit20(object.name)) {
    return "Nombre mayor a 20 caracteres";
  }

  const module = new Module({
    name: object.name,
    description: object.description,
  });

  module
    .save()
    .then((data) => {})
    .catch((err) => {
      return "Error al crear el modulo";
    });
};

export const insertSubModule = async (object) => {
  if (limit20(object.name)) {
    return "Nombre mayor a 20 caracteres";
  }

  const x = await Promise.all(
    object.modules.map(async (v) => {
      return await Module.find({ _id: v });
    })
  );

  const aux = x.find(a => a.length === 0)
  if (aux.length === 0) {
    return "No se pueden insertar modulos que no existan";
  }

  const sub_module = new Sub_Module({
    name: object.name,
    description: object.description,
    modules: object.modules,
  });

  sub_module
    .save()
    .then((data) => {})
    .catch((err) => {
      return "Error al crear el sub_modulo";
    });
};

export const updateModule = async (id, object) => {
  const module = new Module({
    name: object.name,
    description: object.description,
  });

  const id2 = await Module.findById(id);
  if (!id2) return "No existe el id";

  if (limit20(object.name)) {
    return "Nombre mayor a 20 caracteres";
  }

  const x = await Promise.all(
    object.modules.map(async (v) => {
      return await Module.find({ _id: v });
    })
  );

  const aux = x.find(a => a.length === 0)
  if (aux.length === 0) {
    return "No se pueden insertar modulos que no existan";
  }

  Module.findByIdAndUpdate(id, module)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return "Error al modificar el modulo";
    });
};

export const updateSubModule = async (id, object) => {
  const sub_module = new Module({
    name: object.name,
    description: object.description,
  });

  const id2 = await Sub_Module.findById(id);
  if (!id2) return "No existe el id";

  if (limit20(object.name)) {
    return "Nombre mayor a 20 caracteres";
  }

  Sub_Module.findByIdAndUpdate(id, sub_module)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return "Error al modificar el sub_modulo";
    });
};

export const deleteModule = async (id) => {
  const id2 = await Module.findById(id);

  if (!id2) return "No existe el id";

  const value = await Sub_Module.find({ modules: id });

  if (value.length > 0) return "Este modulo tiene asignado sub_modulos";

  const x =  await Module.findByIdAndDelete(id);
  return x;
};

export const deleteSubModule = async (id) => {
  const id2 = await Sub_Module.findById(id);
  if (!id2) return "No existe el id";

  return await Sub_Module.findByIdAndDelete(id);
};
