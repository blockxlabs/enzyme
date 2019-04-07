import React, { Component } from 'react';
import DarkDivider from '../divider/dark-divider';

import './styles.css';

const CONTEXT_MENU_WIDTH = 150;

class ContextMenu extends Component {
  renderListItems = () => {
    const { menuItems } = this.props;

    if (menuItems.length === 0) return;

    const items = menuItems.map((item, index) => (
      <div className="token-list-context-menu-item" onClick={item.onClick}>
        <div className="token-list-context-menu-icon">{item.icon}</div>
        <div className="token-list-context-menu-label">{item.label}</div>

        {menuItems.length - 1 !== index ? (
          <DarkDivider
            className="token-list-context-menu-divider "
            style={{ width: CONTEXT_MENU_WIDTH }}
          />
        ) : (
          <div />
        )}
      </div>
    ));

    return items;
  };

  render() {
    return this.props.contextMenu.show ? (
      <div>
        <div
          className="token-list-context-menu"
          style={{
            position: 'absolute',
            display: 'block',
            top: this.props.contextMenu.top,
            left: this.props.contextMenu.left,
            width: CONTEXT_MENU_WIDTH,
          }}
        >
          <div className="token-list-context-menu-container">{this.renderListItems()}</div>
        </div>
      </div>
    ) : null;
  }
}

export default ContextMenu;

/**
  <div className="token-list-context-menu-item" onClick={this.handleEdit}>
              <div className="token-list-context-menu-icon">
                <IconEdit size={15} />
              </div>
              <div className="token-list-context-menu-label">Edit</div>
              <DarkDivider
                className="token-list-context-menu-divider "
                style={{ width: CONTEXT_MENU_WIDTH }}
              />
            </div>

            <div className="token-list-context-menu-item" onClick={this.handleDelete}>
              <div className="token-list-context-menu-icon">
                <IconDelete />
              </div>
              <div className="token-list-context-menu-label">Delete</div>
            </div>
 */
