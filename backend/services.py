import pandas as pd
import numpy as np

def compute_indicators(df):
    df['Log_Return'] = np.log(df['Price'] / df['Price'].shift(1))
    volatility = df['Log_Return'].std() * np.sqrt(252)
    avg_price = df['Price'].mean()

    return {
        "average_price": round(avg_price, 2),
        "annual_volatility": round(volatility, 4)
    }

def calculate_event_impact(prices_df, events_df, window=5):
    results = []

    for _, event in events_df.iterrows():
        event_date = event['Date']
        before = prices_df[prices_df['Date'] < event_date].tail(window)
        after = prices_df[prices_df['Date'] >= event_date].head(window)

        if not before.empty and not after.empty:
            impact = after['Price'].mean() - before['Price'].mean()
            results.append({
                "Date": event_date.strftime("%Y-%m-%d"),
                "Event": event['Event'],
                "Impact": round(impact, 2)
            })

    return results
