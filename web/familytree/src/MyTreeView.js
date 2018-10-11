import React, {PureComponent} from 'react';
import Treefold from 'react-treefold';
import './MyTreeStyles.css';

function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

const renderPerson = ({ name, born, photoUrl }, gender) => {
  //  let photo = photoUrl ? require(photoUrl) : null
   return (<div style={{border: 0}} className={gender}>
    <div style={{border: 0}}>
      <img style={{width: 50, height: 50, borderRadius:25, display: 'block', margin: '0 auto'}} 
        src={!!photoUrl ? photoUrl : gender === 'male' ? require('./images/man.png') : require('./images/woman.png')} alt={gender}>
      </img>
    </div>
    <text style={{display: 'block'}}>{name}</text>
    <text style={{display: 'block'}}>{` Age : ${getAge(born)}`}</text>
  </div>)
};

class MyTreeView  extends PureComponent {
  render() {
    
    return (<div className="tree">
      <ul>
        <Treefold
          nodes={this.props.familyTree}
          render={({
            node,
            isFolder,
            isExpanded,
            getToggleProps,
            renderChildNodes,
          }) => (
            <li>
              <div
                className={isFolder ? 'non-leaf' : 'leaf'}
                {...(isFolder ? getToggleProps() : {})}
              >
                {node.he && renderPerson(node.he, 'male')}
                {node.he && node.she && <span className="spacer" />}
                {node.she && renderPerson(node.she, 'female')}
              </div>
              {isExpanded && <ul>{renderChildNodes()}</ul>}
            </li>
          )}
        />
      </ul>
    </div>)
  }
}

export default MyTreeView