import React from 'react';
import Gds from "../Gds/Gds";

export default ({toggleGds, added, cart, addGds = null}) => {

  return (
    <React.Fragment>
      {
        cart.map((obj, index)=> {
          let isAdded = false;
          added.map((id)=> {
            if(id === obj.id) {
              isAdded = true;
              return true;
            }
          });

          return (
            <React.Fragment key={index}>
              <Gds
                isAdded={isAdded}
                addedOpacity={true}
                gds={obj}
                toggleGds={toggleGds}
                addGds={addGds}/>
            </React.Fragment>
          )
        })
      }
    </React.Fragment>
  );
}
