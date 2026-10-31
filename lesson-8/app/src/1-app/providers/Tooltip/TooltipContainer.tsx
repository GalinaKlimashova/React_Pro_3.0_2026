const tooltipRoot = document.getElementById('tooltip-root');
if (!tooltipRoot) {
    const el = document.createElement('div');
    el.id = 'tooltip-root';
    document.body.appendChild(el);
}

export const TooltipContainer = () => null;
