const fs = require('fs')
const jose = require('node-jose')

;(async () => {
  try {
    // Cria um key store vazio
    const keystore = jose.JWK.createKeyStore()

    // Gera um par de chaves RSA (RS256)
    const key = await keystore.generate('RSA', 2048, {
      alg: 'RS256',
      use: 'sig',
    })

    // Exporta as chaves em formato PEM
    const privateKeyPem = key.toPEM(true)
    const publicKeyPem = key.toPEM(false)

    // Converte as chaves para base64
    const privateKeyBase64 = Buffer.from(privateKeyPem).toString('base64')
    const publicKeyBase64 = Buffer.from(publicKeyPem).toString('base64')

    // Formata o conteúdo do arquivo .env
    const envContent = `JWT_PRIVATE_KEY=${privateKeyBase64}\nJWT_PUBLIC_KEY=${publicKeyBase64}\n`

    // Escreve o conteúdo no arquivo .env
    fs.writeFileSync('.env', envContent)

    console.log('Chaves geradas e salvas no arquivo .env')
  } catch (err) {
    console.error('Erro ao gerar as chaves:', err)
  }
})()
