import React, { Component } from 'react';
import Clear from '@material-ui/icons/Clear';
import SubHeader from '../../components/common/sub-header';
import FontRegular from '../../components/common/fonts/font-regular';
import FooterButton from '../../components/common/footer-button';
import './styles.css';
import Link from '../../components/common/link';

export default class About extends Component {
  onClick = () => {
    this.props.changePage(this.props.backupPage);
  };

  renderInfoLinks() {
    return (
      <div className="info-container">
        {this.props.links.map(link => (
          <div key={link.url} className={link.value === 'tou' ? 'about-tou' : 'about-link'}>
            <Link href={link.url}>{link.text}</Link>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { manifest } = this.props;
    return (
      <div>
        <SubHeader
          icon={<Clear style={{ color: 'rgba(255, 255, 255, 1)' }} />}
          title="About"
          backBtnOnClick={this.onClick}
        />
        <div className="about-container">
          <FontRegular className="about-title" text={manifest.name} />
          <FontRegular className="about-version" text={`Version ${manifest.version}`} />
          <FontRegular
            className="about-content"
            text={`${manifest.name} is built with ❤ by BlockX Labs in Toronto.`}
          />
          <FontRegular
            className="about-content about-content-more-info"
            text="See blockxlabs.com for more information."
          />
          {this.renderInfoLinks()}
          <FooterButton onClick={this.onClick} name="ok" />
        </div>
      </div>
    );
  }
}
