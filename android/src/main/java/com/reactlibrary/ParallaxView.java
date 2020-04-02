package com.reactlibrary;

import android.content.Context;
import android.graphics.PointF;
import android.graphics.Rect;
import android.util.Log;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.views.view.ReactViewGroup;

import androidx.annotation.Nullable;

public class ParallaxView extends ReactViewGroup {
    private ReactContext reactContext;
    private boolean tvParallaxPropertiesEnabled = true;
    private double magnification = 1.0f;

    public ParallaxView(Context context) {
        super(context);
        reactContext = (ReactContext) this.getContext();
    }

    @Override
    protected void onFocusChanged(boolean gainFocus, int direction, @Nullable Rect previouslyFocusedRect) {
        super.onFocusChanged(gainFocus, direction, previouslyFocusedRect);

        if (tvParallaxPropertiesEnabled) {
            if (gainFocus) {
                scale(magnification, magnification, new PointF(getWidth() / 2, getHeight() / 2));
            } else {
                scale(1f, 1f, new PointF(getWidth() / 2, getHeight() / 2));
            }
        }
    }

    public void setTVParallaxProperties(@Nullable ReadableMap tvParallaxProperties) {
        tvParallaxPropertiesEnabled = tvParallaxProperties.hasKey("enabled")
                ? tvParallaxProperties.getBoolean("enabled")
                : tvParallaxPropertiesEnabled;
        magnification = tvParallaxProperties.hasKey("magnification") ? tvParallaxProperties.getDouble("magnification")
                : magnification;
    }

    public void scale(double scaleX, double scaleY, PointF pivot) {
        setPivotX(pivot.x);
        setPivotY(pivot.y);
        setScaleX((float) scaleX);
        setScaleY((float) scaleY);
    }
}
