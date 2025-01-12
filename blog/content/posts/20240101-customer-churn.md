---
title: "[GenAI Placeholder] Customer Churn / Survival Analysis"
date: 2024-01-01
draft: false
tags: [
    "survival analysis", "customer retention", "data science", 
    "Python", "D3.js", "GenAI", "Placeholder"
]
categories: ["Business Analytics"]
---

Note: this post was created by GenAI (Claude) for temporary filler content.

## The Million Dollar Question

Last week, my colleague Sarah dropped by my desk with what seemed like a simple question: "How long do our customers typically stay with us?" As a data scientist at a SaaS company, I've learned that seemingly simple questions often lead to the most fascinating analyses.

## Beyond Simple Averages

The traditional approach would be to calculate the average customer lifetime. However, this method has a significant flaw: it doesn't account for right-censored data – customers who are still active and haven't churned yet. This is where survival analysis comes in.

## The Data

I pulled three years of customer data, including:
- Customer sign-up dates
- Churn dates (if applicable)
- Monthly recurring revenue (MRR)
- Industry sector
- Company size

Here's a glimpse of our dataset (with anonymized data):

```python
import pandas as pd
import numpy as np
from lifelines import KaplanMeierFitter
import matplotlib.pyplot as plt
import seaborn as sns
import json

# Load and prepare the data
df = pd.DataFrame({
    'customer_id': ['C1001', 'C1002', 'C1003'],
    'signup_date': ['2022-01-15', '2022-01-20', '2022-02-01'],
    'churn_date': [None, '2023-05-10', '2024-01-05'],
    'mrr': [1200, 800, 500],
    'sector': ['Tech', 'Healthcare', 'Retail'],
    'size': ['Small', 'Medium', 'Small']
})

# Convert dates to datetime
df['signup_date'] = pd.to_datetime(df['signup_date'])
df['churn_date'] = pd.to_datetime(df['churn_date'])

print(df.head())
```

## Interactive Survival Analysis

Below is an interactive visualization of our customer survival analysis. The blue line represents the survival probability over time, with the shaded region showing the 95% confidence interval.

<div id="survival-curve"></div>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="/blog/js/survival.js"></script>

<style>
#survival-curve {
    width: 100%;
    min-height: 500px;
    margin: 20px 0;
    /* background: #1a1a1a; */
    border-radius: 8px;
    padding: 20px;
}
#survival-curve svg {
    width: 100%;
    height: 100%;
    overflow: visible;
}
</style>

## Implementing the Analysis

Let's walk through how to perform survival analysis using Python's lifelines library:

```python
# Calculate duration and event status
df['duration'] = (
    df['churn_date'].fillna(pd.Timestamp.now()) - df['signup_date']
).dt.days
df['churned'] = df['churn_date'].notna().astype(int)

# Initialize the KaplanMeierFitter model
kmf = KaplanMeierFitter()

# Fit the model
kmf.fit(
    durations=df['duration'],
    events=df['churned'],
    label='Overall Survival'
)

# Generate survival data for visualization
survival_data = pd.DataFrame({
    'time': kmf.timeline,
    'survival_prob': kmf.survival_function_.values.flatten(),
    'lower_ci': kmf.confidence_interval_['KM_estimate_lower_0.95'],
    'upper_ci': kmf.confidence_interval_['KM_estimate_upper_0.95']
})

# Save to JSON for D3.js visualization
survival_data.to_json('static/data/survival_data.json', orient='records')

# Create a matplotlib visualization for static view
plt.figure(figsize=(10, 6))
kmf.plot()
plt.title('Customer Survival Analysis')
plt.xlabel('Time (days)')
plt.ylabel('Survival Probability')
plt.grid(True)
plt.savefig('static/images/survival_curve_static.png')
plt.close()

# Analyze survival by industry sector
for sector in df['sector'].unique():
    mask = df['sector'] == sector
    kmf.fit(
        durations=df.loc[mask, 'duration'],
        events=df.loc[mask, 'churned'],
        label=sector
    )
    plt.figure(figsize=(10, 6))
    kmf.plot()

plt.title('Survival Analysis by Industry')
plt.xlabel('Time (days)')
plt.ylabel('Survival Probability')
plt.grid(True)
plt.savefig('static/images/survival_by_industry.png')
plt.close()
```

## Key Findings

1. **Median Survival Time**: The median customer lifetime is 425 days, with a 95% confidence interval of [398, 456] days.

2. **Critical Periods**: We identified two critical periods where churn risk spikes:
   - Days 80-100 (end of trial/onboarding period)
   - Days 350-380 (annual contract renewal)

3. **Pattern Analysis**: The survival curve shows several interesting patterns:
   - A steep initial drop in the first 90 days (20% churn)
   - A more gradual decline between 3-9 months
   - A second significant drop around the 12-month mark

## Advanced Analysis: Cox Proportional Hazards

We can go deeper by using a Cox Proportional Hazards model to understand which factors influence churn risk:

```python
from lifelines import CoxPHFitter

# Prepare the data for Cox analysis
cox_data = df.copy()
cox_data['log_mrr'] = np.log(cox_data['mrr'])

# Create dummy variables for categorical features
cox_data = pd.get_dummies(cox_data, columns=['sector', 'size'])

# Fit the Cox model
cph = CoxPHFitter()
cph.fit(
    cox_data,
    duration_col='duration',
    event_col='churned',
    covariates=['log_mrr', 'sector_Tech', 'sector_Healthcare', 'size_Small']
)

# Print the model summary
print(cph.print_summary())
```

## Business Impact

Based on this analysis, we implemented several changes:
1. Enhanced onboarding support during the first 90 days
2. Proactive engagement 60 days before the annual renewal
3. Industry-specific retention strategies

The result? A 15% reduction in churn rate over six months, translating to approximately $2.1M in preserved annual revenue.

## Next Steps

This analysis opened up several new questions we're currently exploring:
- Can we predict churn probability for individual customers?
- How do feature usage patterns correlate with survival?
- What's the optimal intervention timing for at-risk customers?

Stay tuned for follow-up posts where we'll dive into these questions using predictive modeling and causal inference techniques.

## References

1. Survival Analysis: Techniques for Censored and Truncated Data (Klein & Moeschberger, 2003)
2. Customer Churn Prediction Using Survival Analysis (Smith et al., 2023)
3. The Elements of Statistical Learning (Hastie, Tibshirani, & Friedman, 2009)
4. Lifelines Documentation: [https://lifelines.readthedocs.io/](https://lifelines.readthedocs.io/)

---

*This post was written by [Your Name], a data scientist passionate about turning complex analyses into actionable business insights.*