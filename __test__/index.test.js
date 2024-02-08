import axios from 'axios';

//test para modulos

  const url = 'http://127.0.0.1:1234';
  
  describe('Inicio', () => {
    test('Get inicio', async () => {
      const res = await axios.get(url)

      expect(res).toBeTruthy()
      expect(res.status).toBe(200)
      expect(res.data).toEqual('Modulos')
    })
  })


  describe('Modulo', () => {
    test('Agregar modulo correcto', async () => {
      const res = await axios.post(`${url}/modulo`, 
      {
        name: 'Jorge',
        description: 'Jorge123'
      })

      expect(res.status).toBe(200)
      expect(res.data).toEqual('Modulo insertado')
    
    });

    test('Agregar modulo nombre mayor a 20', async () => {
        const res = await axios.post(`${url}/modulo`, 
        {
          name: 'Jorge asd  asad asd asda sdas da sda d asdasdasd asda dasd asd asd',
          description: 'Jorge123'
        })
  
        expect(res.status).toBe(200)
        expect(res.data).toEqual('Nombre mayor a 20 caracteres')
      
      });

    test('Agregar modulo incorrecto', async () => {
        try {
          await axios.post(`${url}/modulo`, {
            name: 'john',
            description: 'john123'
          })
              
        } catch (error) {
          expect(error.response.status).toBe(404)
          expect(error.message).toEqual(
            'Request failed with status code 404'
          )
        }
      });

      test('Eliminar modulo correcto', async () => {
        const id = '65c535d5ec1ce3d629a9c714'
        const res = await axios.delete(`${url}/modulo/${id}`)
         expect(res.status).toBe(200)
         console.log(res)
        expect(res.data).toEqual({
            "_id": "65c535d5ec1ce3d629a9c714",
            "name": "Jorge",
            "description": "Jorge123",
            "createdAt": "2024-02-08T20:13:09.863Z",
            "updatedAt": "2024-02-08T20:13:09.863Z",
            "__v": 0
          })
      
      }); 

      //// los diferentes tests para eliminar


    //   test('Eliminar modulo con id incorrecto', async () => {
    //     const id = '65c375840105066c22932864'
    //     const res = await axios.delete(`${url}/modulo/${id}`)
    //      expect(res.status).toBe(200)
    //     expect(res.data).toEqual("No existe el id")
    //   });  

    //   test('Eliminar modulo con sub_modulo asignado', async () => {
    //     const id = '65c36e0448c1e344c33cd2e7'
    //     const res = await axios.delete(`${url}/modulo/${id}`)
    //      expect(res.status).toBe(200)
    //     expect(res.data).toEqual('Este modulo tiene asignado sub_modulos')
      
    //   });  

      
  })
