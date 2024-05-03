module.exports = {
    credenciales: async (req, res) => {
        try {
            let queryIdAfiliado = req.query.idAfiliado
            let response = await axios({
                method: 'get',
                url: `https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuscaDatoCredencial?IMEI=ADMCE09D187-8D2C-4592-AE43-87B0D657299C&idAfiliado=${queryIdAfiliado}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            let data = await response.data
            let resultado = convert.xml2json(data, { compact: true, spaces: 4 })
            let parseado = JSON.parse(resultado)

            let nombreAfiliado = parseado.Resultado.fila.tablaEncabezado.nombreAfiliado._text
            let numAfiliado = parseado.Resultado.fila.tablaEncabezado.numAfiliado._text
            let fecVencimiento = parseado.Resultado.fila.tablaEncabezado.fecVencimiento._text
            let tipoTarjeta = parseado.Resultado.fila.tablaEncabezado.tipoTarjeta._text

            tipoTarjeta = tipoTarjeta.substring(tipoTarjeta.lastIndexOf(' ') + 1).toLowerCase()

            res.render('credencial', {
                plan: tipoTarjeta,
                nombreAfiliado,
                numAfiliado,
                fecVencimiento
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json(error)
        }
    },
    descargarCredenciales: (req, res) => {
        let idQuery = req.query.idAfiliado
        let urlFinal = `https://andessalud.createch.com.ar/api/credencial?idAfiliado=${idQuery}`
        let file = { url: urlFinal }
        let options = {
            format: 'A5',
            printBackground: true
        };

        pdf.generatePdf(file, options)
            .then(pdfBuffer => {
                fs.writeFileSync((path.join(__dirname, `../public/uploads/${idQuery}.pdf`)), pdfBuffer, 'binary')
                let archivo = fs.readFileSync(path.join(__dirname, `./public/uploads/${idQuery}.pdf`))
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename=${idQuery}.pdf`);
                res.send(archivo)
                fs.unlinkSync(`./public/uploads/${idQuery}.pdf`)
            });
    }
}