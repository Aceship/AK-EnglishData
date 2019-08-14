var fs = require('fs')
const splitEasy = require("csv-split-easy");
var db = {}

db.attacktype = JSON.parse(fs.readFileSync("../json/tl-attacktype.json","utf8"))
db.tags = JSON.parse(fs.readFileSync("../json/tl-tags.json","utf8"))
// const datapath = "../json/excel/"

var characterTable = JSON.parse(fs.readFileSync("../json/excel/character_table.json","utf8"))


Object.keys(characterTable).forEach(element => {
    var currchar = characterTable[element]
    console.log(element)
    if(currchar.description){
        console.log(currchar.description)
        console.log(getSpeciality(currchar.description))
        currchar.description = '<@sizedown>'+ getSpeciality(currchar.description)+'</>'
    }
    currchar.position = db.tags.find(search=>search.tag_cn==currchar.position)?db.tags.find(search=>search.tag_cn==currchar.position).tag_en : currchar.position
    if(currchar.tagList){
        // currchar.tagList.forEach(tags => {
        //     tags = db.tags.find(search=>search.tag_cn==tags)?db.tags.find(search=>search.tag_cn==tags).tag_en : tags
        //     console.log(tags)
        // });
        for(i=0;i<currchar.tagList.length;i++){
            var currtags = currchar.tagList[i]
            var replacetag = ''
            replacetag +=''
            replacetag += (db.tags.find(search=>search.tag_cn==currtags)?db.tags.find(search=>search.tag_cn==currtags).tag_en+'' : currtags)
            replacetag +='\n'
            currchar.tagList[i] = replacetag
            // console.log(tags)
        }
    }

});



fs.writeFile(`../converted/character_table.json`, JSON.stringify(characterTable, null, '\t'), function (err) {
        if (err) {
            return console.log(err);
        }
    })
// var jbinary = require('jbinary')
// if (process.argv.length <= 2) {
//     console.log("Usage: " + __filename + " path/to/directory");
//     process.exit(-1);
// }
 function getSpeciality(description){

        //gonna need to split on "," and "\n" and repeat it
        let descriptions = description.split(/[，(\\n)]/)
        let splitdesc = []
        // console.log("=====================")
        // console.log(descriptions)
        descriptions.forEach(element => {
            if(element){
                let muhRegex = /<@ba\.kw>(.*?)<\/>/g
                let currSpeciality = muhRegex.exec(element)
                // console.log(currSpeciality)
                let filterDesc 
                if(currSpeciality){
                    splitdesc.push([element.replace(currSpeciality[0],""),currSpeciality[1]])
                }else{
                    splitdesc.push([element])
                }
            }
        });
        // console.log(splitdesc)
        // console.log("===========================")
        
        return SpecialityHtml(splitdesc)
    }
    function SpecialityHtml(splitdesc){
        let splitdescTL = []
        let color = ""
        splitdesc.forEach(element => {
            if(element.length>1){
                let typetl = db.attacktype.find(search=>search.type_cn==element.join(""))
                // if(!typetl) typetl = db.attacktype.find(search=>search.type_cn==element[1])
                if(typetl&&!color) color = typetl.type_color?typetl.type_color:undefined

                // console.log(element)
                splitdescTL.push(typetl?typetl.type_en:element.join(""))
            }else{
                let typetl = db.attacktype.find(search=>{
                    if(search.type_detail=="common")
                    return search.type_cn==element[0]
                })
                if(typetl&&!color) color = typetl.type_color?typetl.type_color:undefined
                splitdescTL.push(typetl?typetl.type_en:element[0])
            }
        });
        // console.log(splitdescTL)
        // console.log(color)

        return splitdescTL.join("\n")
        // splitdescTL
    }
//Rookie List Data-----------------

// let rookieData = JSON.parse(fs.readFileSync("../json/RookieTaskData.json","utf8"))
// var rookieArray =[]

// rookieData.forEach(row => {
//     rookieArray.push(`${row.RookieTaskID}-${row.RookieTaskNum} ${row.RookieTaskDesc}`)
// });

// fs.writeFile(`../processed/rookiedata.txt`, rookieArray.join("\n"), function (err) {
//     if (err) {
//         return console.log(err);
//     }
// })

//----------------------------------

// let dailyData = JSON.parse(fs.readFileSync("../json/DailyMissionData.json","utf8"))
// var dailyArray=[]

// dailyData.forEach(row => {
//     dailyArray.push(`${row.DailyMissionArray} ${row.DailyMissionDesc.replace('{0}',row.DailyMissionValue)}`)
// });

// fs.writeFile(`../processed/DailyMissionData.txt`, dailyArray.join("\n"), function (err) {
//     if (err) {
//         return console.log(err);
//     }
// })


// recruitlist.forEach(recruit => {
//     var index = chara.findIndex(search=> search.ItemID == recruit.StuffID)
//     var currchara = chara.find(search=> search.ItemID == recruit.StuffID)
    
//     var currjson = {}
//     if(currchara){
//         var existingRec = recruitArray.find(search=>search.ID == currchara.ItemID)
//         var currskin = charaSkin.find(search=>search.ID == currchara.BasicSkin)
//         // console.log(currchara.Name)
//         // console.log(currskin)
        
//         if(existingRec){
//             // var existingTime = existingRec.RecruitTime.find(search=>search==recruit.RecruitTime)
//             // if(!existingTime)existingRec.RecruitTime.push(recruit.RecruitTime)
//         }else{
//             currjson.ID = currchara.ItemID
//             currjson.Name = currchara.Name
//             currjson.EnglishName = currchara.EnglishName
//             currjson.RecruitTime = recruit.RecruitTime
//             currjson.GirlQualityType = currchara.GirlQualityType
//             currjson.icon = currskin.StageHeadIcon 
//             // currjson.RecruitTime.push(recruit.RecruitTime)
//             currjson.RandomLibraryID = recruit.RandomLibraryID
            
//             recruitArray.push(currjson)
//         }
        
//         // console.log(`${recruit.RecruitTime} ${currchara.} ${currchara.EnglishName}`)
//     }
// });

// recruitArray.sort((a,b)=>{
//     return a.RecruitTime - b.RecruitTime || a.GirlQualityType - b.GirlQualityType
// })
// console.log(recruitArray)

// var csvtext = []
// recruitArray.forEach(element => {
//     // var currTime =[]

//     // element.RecruitTime.forEach(times => {
//     //     currTime.push(timeConvert(times))
//     // });
//     csvtext.push(`"${timeConvert(element.RecruitTime)}","${element.Name}","${element.EnglishName}","${rarity(element.GirlQualityType)}","${element.icon}"`)
//     console.log(`${timeConvert(element.RecruitTime)} ${element.Name} ${element.EnglishName} ${rarity(element.GirlQualityType)} `)

//     // console.log(`${currTime.join("/")} ${element.Name} ${element.EnglishName} `)
// });


// fs.writeFile(`../processed/RecruitList.csv`, csvtext.join("\n"), function (err) {
//     if (err) {
//         return console.log(err);
//     }
// })
