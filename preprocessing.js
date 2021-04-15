/*
Project Created by Wladyslaw Figura
Glasgow Caledonian University Honours Project
Computing 2021
*/

// preprocessing data
let bazka = ['Bruzda Piotr', 'Trzeszkowski Jerzy', 'Domiszewski Andrzej', 'Jaroszewicz Bohdan', 'Antos Zygmunt', 'Słaboń Adolf', 'Nowak Stanisław']
let dates = [new Date(1946, 03, 21), new Date(1945, 01, 10),new Date(1937, 12, 06),new Date(1937, 10, 09),new Date(1938, 11, 04),
    new Date(1928, 10, 14),new Date(1939, 01, 01)]

async function dbSave() {
    let l = bazka.length
    for(let i = 0; i < l; i++){
    const newRider = await new Rider({
      name: bazka[i],
      bornYear: dates[i]
      
    })
    await newRider.save()
}
}

dbSave()