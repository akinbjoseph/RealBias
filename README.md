# RealBias: Pulse Oximeter Bias Evaluation Metrics

This repository contains a novel evaluation framework for pulse oximeters that addresses racial bias in these devices. Our work proposes alternative metrics to the FDA's current ARMS standard, focusing on improving detection of bias in critical oxygen ranges and across different racial/ethnic groups.

## Background

Pulse oximeters, which measure peripheral arterial oxygen saturation (SpO2) noninvasively, have been shown to be less accurate for patients with darker skin pigmentation. This bias can lead to "hidden hypoxemia" in Black and Hispanic patients, with serious clinical consequences including inequities in oxygen therapies and increased mortality.

The FDA currently uses Accuracy Root Mean Square (ARMS) for device clearance, requiring ARMS ≤ 3.0% between arterial oxygen (SaO2) and SpO2 measurements. However, this metric has several limitations:
- It doesn't require reporting on performance by race/ethnicity
- It weights all oxygen saturation ranges equally
- It doesn't focus on the critical 88-92% range where clinical decisions are made
- It doesn't account for directionality of errors (overestimation is more dangerous than underestimation)

## Our Approach

We developed and evaluated several new metrics using the BOLD (Blood-gas Oximetry Linked Dataset) dataset, which contains 49,099 paired measurements across diverse patient populations.

### Key Metrics Developed

1. **DBWE (Directional Bias Weighted Error)**
   - **DBWE_Critical**: Applies directional weighting specifically in the clinical decision range (88-92%)
   - **DBWE_Optimized**: Uses dynamic Gaussian weighting that adapts based on proximity to the critical range

2. **SSTSE (Subgroup-Specific Threshold Sensitive Error)**
   - Evaluates performance specifically across racial/ethnic groups

### Mathematical Formulation

Our metrics implement several key innovations:

1. **Directional weighting**: Assigning higher weight (2.0) to positive residuals (overestimation) vs negative ones (1.0) to account for higher clinical risk of overestimation
   
2. **Critical range sensitivity**: Placing special emphasis on errors in the 88-92% range

3. **Subgroup-specific analysis**: Evaluating performance across racial/ethnic groups

## Key Findings

Our analysis reveals:

1. Standard ARMS metric shows lower values (3.99-4.84) across all groups that would meet FDA clearance (<3.0%) but fails to detect significant racial biases

2. Our DBWE metrics show much higher sensitivity to racial disparities:
   - Black patients show nearly 1.5x higher error rates than White patients in the critical range
   - American Indian/Alaska Native patients also show significantly higher error rates

3. The current ARMS metric inadequately detects clinically significant bias, particularly in the critical oxygen range

## Jupyter Notebook Documentation
For a complete walkthrough of our analysis process with code, results, and detailed explanations, see our Jupyter notebook:
[BOLD Dataset analysis.ipynb](https://github.com/akinbjoseph/RealBias/blob/main/BOLD%20Dataset%20analysis.ipynb)

## Public Awareness Website

We've created [RealBias](https://akinbjoseph.github.io/oximeterfin/Finalbiaswebsite.html), an interactive website that helps public audiences understand the impact of pulse oximeter bias. The site allows users to see how their demographic factors might affect their risk of receiving inaccurate readings.

## Repository Contents

- `analysis/`: Python code for data analysis and metric implementation

## Recommendations for FDA

Based on our work, we recommend:

1. Replacing ARMS with more sensitive metrics like DBWE_Critical or DBWE_Optimized
2. Requiring subgroup-specific reporting by race/ethnicity
3. Establishing separate performance thresholds for the critical 88-92% range
4. Considering the directionality of errors (overestimation vs. underestimation)
5. Requiring larger study populations that include adequate representation across different skin tones

## Citation

If you use our metrics or findings in your research, please cite:

```
@misc{PulseOximeterBiasMetrics,
  author = {[Author Names]},
  title = {Pulse Oximeter Bias Evaluation Metrics},
  year = {2025},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/[username]/[repository]}}
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
