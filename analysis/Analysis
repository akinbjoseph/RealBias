# Data Analysis Methodology

This document outlines the data analysis approach used in our evaluation of pulse oximeter bias and development of improved metrics.

## Dataset

We used the BOLD (Blood-gas Oximetry Linked Dataset) dataset, which contains:

- 49,099 paired SpO₂ and SaO₂ measurements (within a 5-minute window)
- Oxygen saturation levels between 70-100%
- Patient demographic information including race/ethnicity
- Compiled from three EHR databases: MIMIC-III, MIMIC-IV, and eICU-CRD

After data cleaning, we analyzed 41,540 rows with non-null values across 32 key variables.

## Demographic Groups Analyzed

We analyzed the following racial/ethnic groups:
- White
- Black
- Hispanic or Latino
- Asian
- American Indian/Alaska Native
- Unknown

Two racial categories from the original dataset were excluded due to small sample sizes.

## Analysis Approach

Our analysis proceeded through the following steps:

1. **Data Cleaning and Preparation**
   - Removed null values
   - Aligned time stamps for paired measurements
   - Validated data integrity

2. **Basic Error Analysis**
   - Calculated standard ARMS values for the full dataset
   - Identified the distribution of errors

3. **Subgroup Analysis**
   - Calculated ARMS values for each racial/ethnic group
   - Identified disparities in error rates across groups

4. **Critical Range Analysis**
   - Focused on the clinically significant 88-92% range
   - Analyzed error patterns within this specific range

5. **Directionality Analysis**
   - Separated positive errors (overestimation) from negative errors (underestimation)
   - Quantified the clinical impact of each type of error

6. **Metric Development**
   - Created weighted metrics that account for:
     - Directionality of errors
     - Clinical importance of the 88-92% range
     - Racial/ethnic group differences

7. **Validation**
   - Tested new metrics against BOLD dataset
   - Compared performance across different groups

## Key Analysis Results

1. **Racial Disparities in Error Rates**
   - Black patients showed nearly 1.5× higher error rates than White patients
   - American Indian/Alaska Native patients showed 1.3× higher error rates than White patients

2. **Critical Range Errors**
   - Errors in the 88-92% range were more common and clinically significant
   - These errors were disproportionately distributed across racial groups

3. **Directional Bias**
   - Overestimation errors (SpO₂ > SaO₂) were more common in patients with darker skin
   - These errors are more dangerous as they can mask true hypoxemia

4. **Metric Performance**
   - Our proposed DBWE metrics showed significantly higher sensitivity to racial disparities
   - These metrics better reflect the clinical reality of pulse oximeter performance

## Code Structure

The analysis code is organized into the following components:

- `data_preprocessing.py`: Functions for cleaning and preparing the BOLD dataset
- `metrics.py`: Implementation of all evaluation metrics (ARMS, DBWE, etc.)
- `subgroup_analysis.py`: Functions for analyzing performance across racial/ethnic groups
- `visualization.py`: Code for generating charts and visualizations
- `main.py`: Main script that orchestrates the analysis pipeline

## Jupyter Notebook Documentation

For a complete walkthrough of our analysis process with code, results, and detailed explanations, see our Jupyter notebook:

**[BOLD Dataset analysis.ipynb](https://github.com/akinbjoseph/RealBias/blob/main/BOLD%20Dataset%20analysis.ipynb)**

This notebook contains:
- Step-by-step data loading and preprocessing
- Exploratory data analysis with visualizations
- Implementation and testing of all metrics
- Comparative analysis across demographic groups
- Statistical validation of our findings
- Generation of the charts and tables presented in our results

## Visualization

We created several visualizations to illustrate our findings:

1. **Bar charts** comparing metric values across racial/ethnic groups
2. **Heatmaps** showing the relative performance of different metrics
3. **Summary tables** with numerical results

These visualizations clearly demonstrate the increased sensitivity of our proposed metrics to racial bias in pulse oximetry readings.
