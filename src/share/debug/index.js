const development = process.env.NODE_ENV == 'development'
console.log(process.env.NODE_ENV)
if (development) {
    console.log('import v console')
    import('./vconsole').then(vc=>vc)
}

