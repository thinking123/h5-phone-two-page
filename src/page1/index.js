console.log('page1')


function t() {
    return Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, 2000)
    })
}


async function main() {
    console.log('begin main')
    await t()
    console.log('stop main')
}

main()