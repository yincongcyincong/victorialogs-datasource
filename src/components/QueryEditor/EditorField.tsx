import { css } from '@emotion/css';
import React, { ComponentProps, FC } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useTheme2, ReactUtils, Field, Icon, PopoverContent, Tooltip } from '@grafana/ui';

interface EditorFieldProps extends ComponentProps<typeof Field> {
  label: string;
  children: React.ReactElement;
  width?: number | string;
  optional?: boolean;
  tooltip?: PopoverContent;
}

const EditorField: FC<EditorFieldProps> = (props) => {
  const { label, optional, tooltip, children, width, ...fieldProps } = props;

  const theme = useTheme2();
  const styles = getStyles(theme, width);

  // Null check for backward compatibility
  const childInputId = fieldProps?.htmlFor || ReactUtils?.getChildId(children);

  const labelEl = (
    <>
      <label className={styles.label} htmlFor={childInputId}>
        {label}
        {optional && <span className={styles.optional}> - optional</span>}
        {tooltip && (
          <Tooltip placement="top" content={tooltip} theme="info">
            <Icon name="info-circle" size="sm" className={styles.icon} />
          </Tooltip>
        )}
      </label>
    </>
  );

  return (
    <div className={styles.root}>
      <Field className={styles.field} label={labelEl} {...fieldProps}>
        {children}
      </Field>
    </div>
  );
};

export default EditorField;

const getStyles = (theme: GrafanaTheme2, width?: number | string) => {
  return {
    root: css({
      minWidth: theme.spacing(width ?? 0),
    }),
    label: css({
      fontSize: 12,
      fontWeight: theme.typography.fontWeightMedium,
      paddingBottom: theme.spacing(0.5),
    }),
    optional: css({
      fontStyle: 'italic',
      color: theme.colors.text.secondary,
    }),
    field: css({
      marginBottom: 0, // GrafanaUI/Field has a bottom margin which we must remove
    }),
    icon: css({
      color: theme.colors.text.secondary,
      marginLeft: theme.spacing(1),
      ':hover': {
        color: theme.colors.text.primary,
      },
    }),
  };
};
