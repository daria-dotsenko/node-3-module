const server = http.createServer(async (req, res) => {
    if (req.method === 'GET') {
        const content = await fs.readFile(path.join(basePath, 'index.ejs'))
        // res.setHeader('Content-Type', 'text/html')
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(content)
    } else if (req.method === 'POST') {
        const body = []
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Disposition': 'inline' // or 'attachment' if you want to force download
        });

        req.on('data', data => {
            body.push(Buffer.from(data))
        })

        req.on('end', () => {
            const title = body.toString().split('=')[1].replace(/\+/g, ' ')
            addNote(title)
            res.end(`Title = ${title}`)
        })
    }
})