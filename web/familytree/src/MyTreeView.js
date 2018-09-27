import React from 'react';
import Treefold from 'react-treefold';
import './MyTreeStyles.css';

const renderPerson = ({ name, born, died }, gender) => (
  <span className={gender}>
    {name}
  </span>
);

export const MyTreeView = ({familyTree}) => (
  <div className="tree">
    <ul>
      <Treefold
        nodes={familyTree}
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
  </div>
);
