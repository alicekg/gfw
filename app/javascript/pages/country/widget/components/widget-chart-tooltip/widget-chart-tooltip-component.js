import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';

import './widget-chart-tooltip-styles.scss';

class WidgetChartTooltip extends PureComponent {
  render() {
    const { payload, settings, colors } = this.props;
    const values = payload.length > 0 && payload[0].payload;

    return (
      <div className="c-widget-chart-tooltip">
        {settings.map(d => (
          <div key={d.key} className="data-line">
            {d.label && (
              <div className="data-label">
                {colors &&
                  colors[d.key] && (
                    <div
                      className="data-color"
                      style={{ backgroundColor: colors[d.key] }}
                    />
                  )}
                {<span>{values[d.label]}</span>}
              </div>
            )}
            {d.unit
              ? format(d.unit === '%' ? '.1f' : '.3s')(values[d.key])
              : values[d.key]}
            {d.unit}
          </div>
        ))}
      </div>
    );
  }
}

WidgetChartTooltip.propTypes = {
  payload: PropTypes.array,
  settings: PropTypes.array,
  colors: PropTypes.object
};

export default WidgetChartTooltip;
