import Message from "../interface/Message"

export default function getUniqueUsersWhoInteracted(data: any) {

    let uniqueUsers: number = 0
    let alreadyCountedUUIDS: Array<string> = []

    for(let i: number = 0; i < data.length; i++) {

        if(data[i].Direction.trim() == "IN") {      
            if(!alreadyCountedUUIDS.includes(data[i]["Contact UUID"])) {
                uniqueUsers++
                alreadyCountedUUIDS.push(data[i]["Contact UUID"])
            }
        }
    }

    return uniqueUsers
}