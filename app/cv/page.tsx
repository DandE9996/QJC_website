import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae of Juncheng Qian, PhD researcher in air quality, net zero housing, and causal policy evaluation.",
};

export default function CVPage() {
  return (
    <div className="cv-page">
      <section className="cv-hero" aria-labelledby="cv-title">
        <div className="cv-hero-inner">
          <p className="cv-kicker">Curriculum Vitae</p>
          <h1 id="cv-title">Juncheng Qian</h1>
          <p className="cv-role">PhD Researcher | Air Quality, Net Zero Housing, and Causal Policy Evaluation</p>
          <div className="cv-contact" aria-label="Contact details">
            <span>University of Birmingham, Birmingham, UK</span>
            <a href="mailto:juncheng.qian@outlook.com">juncheng.qian@outlook.com</a>
            <a href="https://orcid.org/0009-0002-4144-6749" target="_blank" rel="noreferrer">
              ORCID 0009-0002-4144-6749
            </a>
          </div>
        </div>
      </section>

      <div className="cv-layout">
        <aside className="cv-index" aria-label="CV sections">
          <p>Profile</p>
          <nav>
            <a href="#education">Education</a>
            <a href="#honours">Honours &amp; service</a>
            <a href="#publications">Publications</a>
            <a href="#expertise">Technical expertise</a>
            <a href="#research">Research experience</a>
            <a href="#professional">Professional experience</a>
          </nav>
        </aside>

        <div className="cv-content">
          <section className="cv-section" id="education">
            <div className="cv-section-heading">
              <span>01</span>
              <h2>Education</h2>
            </div>

            <article className="cv-entry">
              <div className="cv-entry-head">
                <div>
                  <h3>Doctor of Philosophy (PhD)</h3>
                  <p className="cv-place">University of Birmingham, UK</p>
                </div>
                <p className="cv-date">Sep 2023 – Sep 2027 (expected)</p>
              </div>
              <p className="cv-meta">School of Geography, Earth and Environmental Sciences</p>
              <p className="cv-meta">Supervisors: Prof. Zongbo Shi, Prof. Yuli Shan, and Dr Bowen Liu</p>
              <p>
                Research focus: Low-cost sensor calibration; longitudinal indoor air quality monitoring; causal evaluation of housing retrofit and transport policies; and equity analysis of England’s retrofit landscape.
              </p>
            </article>

            <article className="cv-entry">
              <div className="cv-entry-head">
                <div>
                  <h3>Master of Environmental Science</h3>
                  <p className="cv-place">University of Melbourne, Australia</p>
                </div>
                <p className="cv-date">Jul 2021 – Jun 2023</p>
              </div>
              <p>Focus: Air quality, climate change, energy transition, and climate policy.</p>
            </article>

            <article className="cv-entry">
              <div className="cv-entry-head">
                <div>
                  <h3>Honours Bachelor of Science</h3>
                  <p className="cv-place">University of Toronto, Canada</p>
                </div>
                <p className="cv-date">Sep 2017 – Jun 2021</p>
              </div>
              <p>Double major in Earth Sciences and Ecology &amp; Evolutionary Biology.</p>
            </article>
          </section>

          <section className="cv-section" id="honours">
            <div className="cv-section-heading">
              <span>02</span>
              <h2>Honours &amp; Academic Service</h2>
            </div>

            <article className="cv-entry cv-award">
              <div className="cv-entry-head">
                <div>
                  <p className="cv-mini-label">Award</p>
                  <h3>Best Reviewer Award</h3>
                  <p className="cv-place">ACM Transactions on Social Computing (TSC)</p>
                </div>
                <p className="cv-date">2026</p>
              </div>
              <p>Selected by the journal’s Award Selection Committee for exceptional, constructive, and timely peer review.</p>
            </article>
          </section>

          <section className="cv-section" id="publications">
            <div className="cv-section-heading">
              <span>03</span>
              <h2>Publications</h2>
            </div>

            <div className="cv-subsection-heading">
              <h3>Published peer-reviewed articles</h3>
            </div>

            <div className="cv-publications">
              <article className="cv-publication">
                <span className="cv-pub-number">01</span>
                <div>
                  <p className="cv-pub-authors"><strong>Qian, J.</strong>, Wynn, T., Liu, B., Shan, Y., Bartington, S. E., Pope, F. D., Dai, Y., &amp; Shi, Z. (2026).</p>
                  <h3>Enhancing accuracy of indoor air quality sensors via automated machine-learning calibration.</h3>
                  <p className="cv-pub-journal">Atmospheric Measurement Techniques, 19(2), 603–615.</p>
                  <a href="https://doi.org/10.5194/amt-19-603-2026" target="_blank" rel="noreferrer">doi.org/10.5194/amt-19-603-2026</a>
                </div>
              </article>

              <article className="cv-publication">
                <span className="cv-pub-number">02</span>
                <div>
                  <p className="cv-pub-authors">Dai, Y., <strong>Qian, J.</strong>, Zhong, J., Cai, X., &amp; MacKenzie, A. R. (2026).</p>
                  <h3>Recent progress, bottlenecks, and outlook of multiscale air quality modelling: A review.</h3>
                  <p className="cv-pub-journal">Atmospheric Environment: X, 29, 100435.</p>
                  <a href="https://doi.org/10.1016/j.aeaoa.2026.100435" target="_blank" rel="noreferrer">doi.org/10.1016/j.aeaoa.2026.100435</a>
                </div>
              </article>

              <article className="cv-publication">
                <span className="cv-pub-number">03</span>
                <div>
                  <p className="cv-pub-authors">Dai, Y., <strong>Qian, J.</strong>, Yang, Y., Liu, B., Li, S., Zhang, K., Xie, Q., Tong, C., Chen, Y., MacKenzie, A. R., &amp; Shi, Z. (2026).</p>
                  <h3>Significant benefits of pollution alerts for cleaner air and better health.</h3>
                  <p className="cv-pub-journal">PNAS Nexus, 5(3), pgag054.</p>
                  <a href="https://doi.org/10.1093/pnasnexus/pgag054" target="_blank" rel="noreferrer">doi.org/10.1093/pnasnexus/pgag054</a>
                </div>
              </article>

              <article className="cv-publication">
                <span className="cv-pub-number">04</span>
                <div>
                  <p className="cv-pub-authors">Ren, X., Zhang, M., <strong>Qian, J.</strong>, Li, S., Wang, J., &amp; Du, J. (2022).</p>
                  <h3>Analysing spatio-temporal change in ecosystem quality and its driving mechanism in Henan Province, China, from 2010 to 2020.</h3>
                  <p className="cv-pub-journal">Sustainability, 14(18), 11742.</p>
                  <a href="https://doi.org/10.3390/su141811742" target="_blank" rel="noreferrer">doi.org/10.3390/su141811742</a>
                </div>
              </article>
            </div>

            <div className="cv-subsection-heading cv-subsection-spaced">
              <h3>Manuscripts under review</h3>
            </div>

            <div className="cv-publications">
              <article className="cv-publication">
                <span className="cv-pub-number">05</span>
                <div>
                  <p className="cv-pub-authors"><strong>Qian, J.</strong>, Dai, Y., Bartington, S. E., Čavoški, A., Chung, C. Y., Ghaffarpasand, O., Muller, C. L., Prestwood, E., Tong, C., Wang, X., Shan, Y., Liu, B., &amp; Shi, Z. (2026).</p>
                  <h3>Impacts of housing retrofits on indoor environmental quality and energy consumption: A review.</h3>
                  <p className="cv-pub-journal">Indoor Air, under review.</p>
                </div>
              </article>

              <article className="cv-publication">
                <span className="cv-pub-number">06</span>
                <div>
                  <p className="cv-pub-authors">Tong, C., Dai, Y., <strong>Qian, J.</strong>, Su, Y., Shao, J., Hall, J., Yuan, J., Zhao, Y., Cole, M. A., Elliott, R. J. R., Liu, B., &amp; Shi, Z. (2026).</p>
                  <h3>Low Emission Zones and urban air quality: Two decades of European evidence.</h3>
                  <p className="cv-pub-journal">PNAS, under review.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="cv-section" id="expertise">
            <div className="cv-section-heading">
              <span>04</span>
              <h2>Technical Expertise</h2>
            </div>

            <div className="cv-skill-grid">
              <article>
                <p className="cv-mini-label">Measurement</p>
                <h3>Air quality measurement</h3>
                <p>Low-cost sensor networks; reference-instrument co-location and calibration; deployment and QA/QC; long-term indoor and outdoor monitoring; PM₂.₅, CO₂, temperature, relative humidity, and black carbon time series.</p>
              </article>
              <article>
                <p className="cv-mini-label">Evaluation</p>
                <h3>Causal inference and policy evaluation</h3>
                <p>Weather normalisation; augmented synthetic control; Bayesian Structural Time Series and CausalImpact; difference-in-differences; double machine learning; Bayesian hierarchical models; matched-control and interrupted time-series designs.</p>
              </article>
              <article>
                <p className="cv-mini-label">Computing</p>
                <h3>Machine learning and computing</h3>
                <p>Python, R, Git, and HPC workflows; random forests; automated calibration; feature engineering; cross-validation; large-scale longitudinal and high-frequency environmental data processing.</p>
              </article>
              <article>
                <p className="cv-mini-label">Systems</p>
                <h3>Spatial, policy, and equity analysis</h3>
                <p>Linkage of environmental, traffic, housing, socioeconomic, and policy datasets; distributional analysis; remote sensing; environmental justice; and health equity.</p>
              </article>
            </div>
          </section>

          <section className="cv-section" id="research">
            <div className="cv-section-heading">
              <span>05</span>
              <h2>Research Experience</h2>
            </div>

            <article className="cv-entry cv-experience">
              <div className="cv-entry-head">
                <div>
                  <h3>WM-Net Zero (Heal-NZ): A Health-centred Systems Approach towards Net Zero</h3>
                  <p className="cv-place">Doctoral Researcher</p>
                </div>
                <p className="cv-date">2023 – Present</p>
              </div>
              <p className="cv-meta">Funder: Wellcome Trust | Programme funding: £1.98 million | Lead PI: Prof. Zongbo Shi</p>
              <p>Regional living lab co-designed with the West Midlands Combined Authority, local authorities, Defra, and community partners across transport decarbonisation, Net Zero Neighbourhoods, and energy innovation.</p>
              <ul>
                <li>Led the design, deployment, quality assurance, and data management for a two-year study of PM₂.₅, CO₂, temperature, and relative humidity in occupied homes before and after energy-efficiency retrofits.</li>
                <li>Developed and cross-validated an automated machine-learning calibration pipeline for low-cost air quality sensors using reference-instrument co-location data and long-term performance validation, leading to a first-author paper in Atmospheric Measurement Techniques.</li>
                <li>Apply Bayesian Structural Time Series, matched controls, and random-forest weather normalisation to estimate intervention effects while separating them from meteorological variability.</li>
                <li>Develop a national machine-learning equity audit linking more than 29 million longitudinal Energy Performance Certificate records with deprivation, housing need, and affordability indicators.</li>
                <li>Extended the programme to transport policy by compiling hourly PM₂.₅, black carbon, and ultraviolet absorption data for England and applying dual-wavelength source apportionment to distinguish fossil-fuel and biomass-burning contributions.</li>
              </ul>
            </article>

            <article className="cv-entry cv-experience">
              <div className="cv-entry-head">
                <div>
                  <h3>INHABIT Hub: Indoor HABItability during the Transition to Net Zero Housing</h3>
                  <p className="cv-place">Research Contributor</p>
                </div>
                <p className="cv-date">2025 – Present</p>
              </div>
              <p className="cv-meta">Funder: UKRI–NIHR | Programme funding: £7.3 million | Lead PI: Prof. Zongbo Shi</p>
              <ul>
                <li>Extend sensor calibration, deployment, quality assurance, and longitudinal analysis methods developed in the two-year Dudley housing cohort to larger UK housing studies.</li>
                <li>Contribute to the evidence base linking retrofit implementation with indoor exposures, health co-benefits, and distributional outcomes.</li>
              </ul>
            </article>

            <article className="cv-entry cv-experience">
              <div className="cv-entry-head">
                <div>
                  <h3>Zero Carbon Buildings: City of Melbourne Industry Project</h3>
                  <p className="cv-place">Lead Researcher | University of Melbourne</p>
                </div>
                <p className="cv-date">2022 – 2023</p>
              </div>
              <ul>
                <li>Developed pathways to net-zero emissions for Melbourne’s building stock by integrating renewable supply, energy-efficiency measures, energy storage, carbon offsetting, and policy levers.</li>
              </ul>
            </article>

            <article className="cv-entry cv-experience">
              <div className="cv-entry-head">
                <div>
                  <h3>Remote Sensing Assessment of Ecosystem Quality, Henan Province</h3>
                </div>
                <p className="cv-date">2021 – 2022</p>
              </div>
              <ul>
                <li>Analysed changes in ecological condition from 2015 to 2020 using remote-sensing indices; contributed to data curation, spatial interpretation, and report drafting.</li>
              </ul>
            </article>
          </section>

          <section className="cv-section" id="professional">
            <div className="cv-section-heading">
              <span>06</span>
              <h2>Professional Experience</h2>
            </div>

            <article className="cv-entry cv-experience">
              <div className="cv-entry-head">
                <div>
                  <h3>Agora Energiewende: Team China, International Programme</h3>
                  <p className="cv-place">Research Assistant | Beijing, China</p>
                </div>
                <p className="cv-date">Nov 2021 – Apr 2022</p>
              </div>
              <ul>
                <li>Analysed Chinese and European energy-transition policy, the transformation of state-owned coal companies, power-system trends, renewable deployment, and coal-related employment.</li>
                <li>Built a European energy-transition database; produced analytical and graphical inputs for the China Energy Impact Tracker; and coordinated workshops with the Chinese Academy of Social Sciences and Energy Foundation China.</li>
              </ul>
            </article>

            <article className="cv-entry cv-experience">
              <div className="cv-entry-head">
                <div>
                  <h3>Fudan University: School of Life Sciences</h3>
                  <p className="cv-place">Research Assistant | Qinghai–Tibet Plateau, China</p>
                </div>
                <p className="cv-date">Jun 2018 – Aug 2018</p>
              </div>
              <ul>
                <li>Designed field experiments and collected plant samples; contributed to a research report on meadow ecosystems.</li>
              </ul>
            </article>

            <article className="cv-entry cv-experience">
              <div className="cv-entry-head">
                <div>
                  <h3>Natural Resources Defense Council (NRDC): China Coal Cap Project</h3>
                  <p className="cv-place">Research Assistant | Henan Province, China</p>
                </div>
                <p className="cv-date">May 2018 – Jun 2018</p>
              </div>
              <ul>
                <li>Conducted field interviews on coal-to-gas and coal-to-power policy implementation and contributed to the 2018 national dispersed-coal management report.</li>
              </ul>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
