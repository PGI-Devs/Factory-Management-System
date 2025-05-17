import React from 'react'
import "./cardSection.css"
import Card1 from '../charts/Card1'
import { AiOutlineTool } from 'react-icons/ai'
import { LayoutGroup } from 'framer-motion'

const CardSection = () => {


    const card1data=[
        {
            id:1,
            title:"Factory 1",
            color:{
                backGround: "linear-gradient(180deg, #ff6a00 0%, #ff8c00 100%)",
                boxShadow: "0px 15px 25px 0px rgba(255, 140, 0, 0.5)",
                
            },
            barValue1:50,
            barValue2:40,
            barValue3:20,
            value:"59",
            png:AiOutlineTool,
            series:[
                {
                    name:"Sales",
                    data:[32,40,28,51],
                },
            ],

        },

        {
            id:2,
            title:"Factory 2",
            color:{
                backGround:"linear-gradient(180deg,#bb67ff 0%,#c484f3 100%)",
                boxShadow:"0px 10px 20px 0px #e0c6f5",
            },
            barValue1:50,
            barValue2:40,
            barValue3:20,
            value:"97",
            png:AiOutlineTool,
            series:[
                {
                    name:"Sales",
                    data:[51,42,109,100],
                },
            ],
            
        },

        {
            id:3,
            title:"Factory 3",
            color:{
                backGround:"linear-gradient(180deg, #1de9b6 0%, #00e5ff 100%)",
                boxShadow:"0px 12px 22px 0px rgba(29, 233, 182, 0.6)",
            },
            barValue1:50,
            barValue2:40,
            barValue3:20,
            value:"25",
            png:AiOutlineTool,
            series:[
                {
                    name:"Sales",
                    data:[32,40,51,42],
                },
            ],
            
        },
       
      
    ]


  return (

    
   <div className="Cards">
       <LayoutGroup>
   
    {
        card1data && card1data.map((card,id)=>(
          <div className="parentContainer">

            <Card1
            id={card.id}
            title={card.title}
            color={card.color}
            barValue1={card.barValue1}
            barValue2={card.barValue2}
            barValue3={card.barValue3}
            value={card.value}
            png={card.png}
            series={card.series}
            />
          </div>
        ))
    }
    </LayoutGroup>
   </div>
   
  )
}

export default CardSection