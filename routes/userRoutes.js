const fs = require('fs')//lidar com arquivos file system
const { join } = require('path') //lidar com pasta de arquivos

const filePath = join(__dirname, 'users.json')//interação com bd, armazenar usuarios
//junção do nome do diretorio da rota de usuários e o nome do arquivo dos usuários

const getUsers = () => {//função pra pegar os usuarios
    const data = fs.existsSync(filePath)//verificar se existe o arquivo
        ? fs.readFileSync(filePath)//se existir, leia de maneira assíncrona
        : []//se n existir, retornar obj vazio

        try{
            return JSON.parse(data)//fzr o parse com os dados
        } catch (error) {
            return []//se der erro, retornar vazio
        }
}