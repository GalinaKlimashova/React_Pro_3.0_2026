import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { FC, MouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from '6-shared/model/theme';

import type { TooltipPosition } from './TooltipPosition';

const POPOUT_DELAY = 100;

interface UseTooltipResult {
    visible: boolean;
    onMouseEnter: () => void;
    onMouseLeave: (e: MouseEvent<HTMLSpanElement>) => void;
    onPopupMouseEnter: () => void;
    onPopupMouseLeave: () => void;
}

function useTooltip(popupRef: React.RefObject<HTMLDivElement | null>): UseTooltipResult {
    const [visible, setVisible] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const from = useRef<'children' | 'popup' | null>(null);

    const clearTimer = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    }, []);

    const scheduleClose = useCallback(() => {
        if (!timer.current) {
            timer.current = setTimeout(() => {
                setVisible(false);
                timer.current = null;
            }, POPOUT_DELAY);
        }
    }, []);

    useEffect(() => clearTimer, [clearTimer]);

    return {
        visible,
        onMouseEnter: () => {
            clearTimer();
            setVisible(true);
            from.current = 'children';
        },
        onMouseLeave: (e: MouseEvent<HTMLSpanElement>) => {
            const target = e.nativeEvent.relatedTarget as Node | null;
            if (popupRef.current?.contains(target)) {
                from.current = 'popup';
                clearTimer();
                setVisible(true);
                return;
            }
            from.current = 'children';
            scheduleClose();
        },
        onPopupMouseEnter: () => {
            clearTimer();
            setVisible(true);
        },
        onPopupMouseLeave: () => {
            from.current = 'children';
            scheduleClose();
        },
    };
}

function computePosition(anchorRect: DOMRect, popupRect: DOMRect, position: TooltipPosition): React.CSSProperties {
    const offset = 8;
    switch (position) {
        case 'top':
            return {
                left: anchorRect.left + anchorRect.width / 2 - popupRect.width / 2,
                top: anchorRect.top - popupRect.height - offset,
            };
        case 'bottom':
            return {
                left: anchorRect.left + anchorRect.width / 2 - popupRect.width / 2,
                top: anchorRect.bottom + offset,
            };
        case 'left':
            return {
                left: anchorRect.left - popupRect.width - offset,
                top: anchorRect.top + anchorRect.height / 2 - popupRect.height / 2,
            };
        case 'right':
            return {
                left: anchorRect.right + offset,
                top: anchorRect.top + anchorRect.height / 2 - popupRect.height / 2,
            };
        default:
            throw new Error('Unexpected tooltip position');
    }
}

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    position?: TooltipPosition;
}

export const Tooltip: FC<TooltipProps> = ({ children, content, position = 'top' }) => {
    const localRef = useRef<HTMLSpanElement>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
    const [popupRect, setPopupRect] = useState<DOMRect | null>(null);
    const { visible, onMouseEnter, onMouseLeave, onPopupMouseEnter, onPopupMouseLeave } = useTooltip(popupRef);

    useEffect(() => {
        const update = () => {
            setAnchorRect(localRef.current?.getBoundingClientRect() ?? null);
            setPopupRect(popupRef.current?.getBoundingClientRect() ?? null);
        };
        update();
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true);
        return () => {
            window.removeEventListener('resize', update);
            window.removeEventListener('scroll', update, true);
        };
    }, []);

    const posStyle = anchorRect && popupRect ? computePosition(anchorRect, popupRect, position) : {};

    // ---- CSS-in-JS ThemeContext ----
    const { colors } = useTheme();

    const popupStyle: React.CSSProperties = {
        position: 'fixed',
        zIndex: 9999,
        padding: '6px 10px',
        fontSize: '14px',
        lineHeight: '1.4',
        color: colors.portalText,
        backgroundColor: colors.portalBg,
        borderRadius: '6px',
        boxShadow: colors.portalShadow,
        whiteSpace: 'nowrap',
        pointerEvents: 'none', // клики проходят к элементам ниже
        ...posStyle,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-4px)',
        transition: 'opacity 150ms ease, transform 150ms ease',
    };

    // Предотвращаем стандартные действия при наведении внутри popup — изоляция событий,
    // чтобы взаимодействия с popup не влияли на страницу.
    const handlePopupEvent = (e: MouseEvent) => e.preventDefault();

    return (
        <span
            ref={localRef}
            style={{ display: 'inline-flex', cursor: 'default' }}
            onMouseEnter={(e) => {
                // Изолируем hover внутри компонента — клики детей всплывают свободно
                e.stopPropagation();
                onMouseEnter();
            }}
            onMouseLeave={onMouseLeave}
        >
            {/* Дети не имеют блокировки pointerEvents и перехвата событий */}
            {children}
            {(() => {
                const root = document.getElementById('tooltip-root');
                if (!root) return null;
                return createPortal(
                    <div
                        ref={popupRef}
                        style={popupStyle}
                        onMouseEnter={(e) => {
                            handlePopupEvent(e);
                            onPopupMouseEnter();
                        }}
                        onMouseLeave={(e) => {
                            handlePopupEvent(e);
                            onPopupMouseLeave();
                        }}
                    >
                        <span>{content}</span>
                    </div>,
                    root,
                );
            })()}
        </span>
    );
};
