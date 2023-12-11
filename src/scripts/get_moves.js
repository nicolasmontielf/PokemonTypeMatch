 /* eslint-disable */
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('node:fs')

async function main() {
    const stream = fs.createWriteStream('./src/data/moves.json', { encoding: 'utf8' })
    const { data } = await axios.get('https://www.pokexperto.net/index2.php?seccion=nds/movimientos_pokemon', {
        headers: {
            'Content-Type': 'text/html; charset=utf-8'
        }
    })
    const $ = cheerio.load(data);

    const tableMoves = $('table.pkmain table.sortable.left');
    const moves = $(tableMoves).find('tbody tr.check3.bazul');

    stream.write('[\n')

    for (const move of moves) {
        const data = $(move).find('td');
        const [nameEl, typeEl, , powerEl, ppEl, accuracyEl, effectEl] = data;

        const name = $(nameEl).find('a:first-child').text().trim();
        const type = $(typeEl).find('img').attr('alt');
        const power = $(powerEl).text().trim();
        const pp = $(ppEl).text().trim();
        const accuracy = $(accuracyEl).text().trim();
        const effect = $(effectEl).text().trim();

        stream.write(JSON.stringify({ name, type, power, pp, accuracy, effect }) + ',\n')
    }
    stream.write(']')
}

main()