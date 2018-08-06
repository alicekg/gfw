import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Toggle from 'components/ui/toggle';
import Button from 'components/ui/button';
import Icon from 'components/ui/icon';

import infoIcon from 'assets/icons/info.svg';

import './styles.scss';

class LayerToggle extends PureComponent {
  render() {
    const {
      data: { name, subtitle, meta, layer, dataset, active, color, colour },
      onInfoClick,
      onToggle,
      small
    } = this.props;

    return (
      <div className={`c-layer-toggle ${small ? '-small' : ''}`}>
        <Toggle
          theme={!small ? 'toggle-large' : ''}
          value={active}
          onToggle={value => onToggle({ dataset, layer }, value)}
          color={color || colour}
        />
        <div className="c-layer-toggle__content">
          <div className="c-layer-toggle__header">
            <div className="c-layer-toggle__name">{name}</div>
            <Button
              className="theme-button-tiny theme-button-grey-filled square info-button"
              onClick={() => onInfoClick(meta)}
            >
              <Icon icon={infoIcon} className="info-icon" />
            </Button>
          </div>
          {subtitle && (
            <div className="c-layer-toggle__subtitle">{`(${subtitle})`}</div>
          )}
        </div>
      </div>
    );
  }
}

LayerToggle.propTypes = {
  data: PropTypes.object,
  onInfoClick: PropTypes.func,
  onToggle: PropTypes.func,
  small: PropTypes.bool
};

export default LayerToggle;
