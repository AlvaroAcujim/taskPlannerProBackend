const {uploadFile, downloadFile} = require('../services/fileService');

const fileController = {
    uploadAndReplaceImage: [
        async(req, res) => {
            try{
                const { model, id } = req.params;
                const file = req.file;
            
                if (!file) return res.status(400).json({ error: 'Archivo no proporcionado' });
            
                const updatedDoc = await uploadFile(model, id, file);
            
                res.status(200).json({message: 'Imagen subida y actualizada correctamente', data: updatedDoc});
            }catch(err){
                console.log('Error al subir la imagen', err);
                res.status(500).json({error: 'Error al subir imagen'});
            } 
        }
    ],
    serveImage: [
        async(req, res) => {
            const { model, filename } = req.params;
  
            try {
              const filePath = await downloadFile(model, filename);
          
              // Enviar archivo al navegador (inline)
              res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.sendFile(filePath);
            } catch (err) {
              console.error('Error al servir imagen:', err);
              res.status(404).json({ error: err.message });
            }   
        }
    ]
}

module.exports = fileController;