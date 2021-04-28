const {Keyword} = require('../models');
const dateList = require('../data.json');
const { search } = require('../routes/search');
const db = require('../models');

module.exports = {

    Search : async (req,res) => {
        try{
            let {keywords} = req.query;
            console.log(req.query);
            const base_keywords = await Keyword.findOne({  
                where : {
                    idx : 1, 
                }
            });
   
            let base_arr = base_keywords.keywords.split(",");
            console.log(base_arr);
            base_arr.push(keywords);
            base_arr = base_arr.filter((keywords) => {
                return keywords !== null && keywords !== undefined && keywords !== "";
            });
            if(base_arr.length > 30){
                base_arr.shift();
            }
            const rows = await Keyword.update(
                {
                    keywords: base_arr.toString(),
                },
                {
                    where: {
                        idx : 1,
                    }
                }
            );
            if(rows) return res.status(200).json({result:true});
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    List : async (req,res) => {
        try{
            const base_keywords = await Keyword.findOne({
               where : {
                idx : 1
               },
            });
            let base_arr = base_keywords.keywords.split(",");
            let count = {};
            base_arr.forEach((k) => {
                count[k] = (count[k] || 0) + 1;
            });
            console.log('체크시작');
            console.log(count);
            
            let compareCount = [];
            let compareKey = [];
            for (key in count) {
                compareKey.push(key);
                compareCount.push(count[key]);
            }
            console.log('compareCount');
            console.log(compareCount);
            console.log('compareKey');
            console.log(compareKey);
            let arr = [1,2];
            let temp = arr[0];
            arr[0] = arr[1];
            arr = [2,2]
            arr[1] = temp;;
            arr = [2,1];
            let tempKey = "";
            let tempCount = 0;
            for (let i = 0; i < compareKey.length; i++){
                // compareCount[0] = 1 compareKey[0] = 1
                // compareCount[1] = 3 compareKey[1] = 공
                // tempCount = 1 tempKey = 1
                //  compareCount[0] = 3 compareKey[0] = 공
                //  compareCount[1] = 1 compareKey[1] = 1
                if(compareCount[i] < compareCount[i + 1]) {
                    tempKey = compareKey[i];
                    tempCount = compareCount[i];
                    //
                    compareKey[i] = compareKey[i + 1];
                    compareCount[i] = compareCount[i + 1];
                    //
                    compareKey[i + 1] = tempKey;
                    compareCount[i + 1] = tempCount;
                }
            }

            let recommend = [];
            let k = 0;
            // console.log(compareKey);
            while ( k < compareKey.length ){
                for(let i = 0; i < dateList.length; i++){
                    if(compareKey[k] === dateList[i].genre){
                        recommend.push(dateList[i]);
                    }
                }
                k = k + 1;
            }

            while (recommend.length > 10){
                recommend.pop();
            }
            console.log(recommend.length);
            return res.status(200).json({result: recommend});
        } catch (err){
            return res.status(400).send(err);
        }
    }


}