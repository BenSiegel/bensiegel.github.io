import React, { useState } from "react";
import "./Dashboard.css";

const mockKpis = [
  { label: "Total SKUs", value: "1,284", change: "+4.2%", tone: "good" },
  { label: "Low stock items", value: "37", change: "+9", tone: "warn" },
  { label: "Out of stock", value: "12", change: "-3", tone: "good" },
  { label: "Inventory accuracy", value: "98.1%", change: "+1.3%", tone: "good" },
];

const mockTopProducts = [
  { sku: "SKU-00123", name: "Blue Hoodie M", stock: 540, status: "Healthy" },
  { sku: "SKU-00487", name: "Running Shoes 9", stock: 42, status: "Low" },
  { sku: "SKU-00911", name: "Phone Case – Black", stock: 0, status: "Out" },
  { sku: "SKU-00215", name: "LED Desk Lamp", stock: 188, status: "Healthy" },
];

const mockLocations = [
  { bin: "A-01-01", sku: "SKU-00123", qty: 120 },
  { bin: "A-02-03", sku: "SKU-00487", qty: 24 },
  { bin: "B-04-02", sku: "SKU-00911", qty: 0 },
  { bin: "C-01-05", sku: "SKU-00215", qty: 60 },
];

function KpiCard({ label, value, change, tone }) {
  return (
    <div className="card kpi-card">
      <span className="kpi-label">{label}</span>
      <span className="kpi-value">{value}</span>
      <span className={`kpi-change kpi-change-${tone}`}>{change} vs last 30d</span>
    </div>
  );
}

function TopProductsTable() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Top moving SKUs</h2>
        <span className="pill">By units shipped</span>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>On Hand</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockTopProducts.map((p) => (
            <tr key={p.sku}>
              <td>{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.stock}</td>
              <td>
                <span
                  className={
                    p.status === "Healthy"
                      ? "badge badge-green"
                      : p.status === "Low"
                      ? "badge badge-amber"
                      : "badge badge-red"
                  }
                >
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LocationHeatmap() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Bin utilization</h2>
        <span className="pill">Mock heatmap</span>
      </div>
      <div className="heatmap-grid">
        {mockLocations.map((loc) => (
          <div
            key={loc.bin}
            className={`heatmap-cell ${
              loc.qty === 0 ? "heatmap-empty" : loc.qty < 30 ? "heatmap-low" : "heatmap-full"
            }`}
          >
            <span className="heatmap-bin">{loc.bin}</span>
            <span className="heatmap-qty">{loc.qty} pcs</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReplenishmentPanel() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Replenishment suggestions</h2>
      </div>
      <ul className="list">
        <li>
          <span className="dot dot-amber" />
          <div>
            <div className="list-title">SKU-00487 – Running Shoes 9</div>
            <div className="list-sub">
              Suggested reorder: 180 units (14 days cover). Supplier LT: 10 days.
            </div>
          </div>
        </li>
        <li>
          <span className="dot dot-red" />
          <div>
            <div className="list-title">SKU-00911 – Phone Case – Black</div>
            <div className="list-sub">
              Currently out of stock. Expedite open PO or switch to alternate SKU.
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

/** TAB SECTIONS **/

function OverviewSection() {
  return (
    <>
      <section className="kpi-grid">
        {mockKpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </section>

      <section className="content-grid">
        <TopProductsTable />
        <LocationHeatmap />
      </section>

      <section className="content-grid single">
        <ReplenishmentPanel />
      </section>
    </>
  );
}

function WmsSection() {
  return (
    <section className="content-grid single">
      <div className="card">
        <div className="card-header">
          <h2>Warehouse Management System integration</h2>
        </div>
        <p className="paragraph">
          Connect cloud WMS with ERP, marketplaces, and carriers to create a single source of truth
          for inventory and movements.
        </p>
        <div className="content-grid single">
          <div className="card soft-card">
            <h3>Live stock map</h3>
            <p className="paragraph">
              Bin-level visibility with cycle count recommendations based on variance risk.
            </p>
          </div>
          <div className="card soft-card">
            <h3>Smart picking</h3>
            <p className="paragraph">
              Support for wave, batch, and zone picking with SLA-aware prioritization.
            </p>
          </div>
          <div className="card soft-card">
            <h3>Exception workflows</h3>
            <p className="paragraph">
              Guided flows for shorts, damages, and substitutions with audit history.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnalyticsSection() {
  return (
    <section className="content-grid">
      <div className="card">
        <div className="card-header">
          <h2>Operations KPI board</h2>
          <span className="pill">BI dashboard</span>
        </div>
        <ul className="list">
          <li>
            <span className="dot dot-blue" />
            <div>
              <div className="list-title">Top 10 fastest-moving SKUs</div>
              <div className="list-sub">
                Identify items driving most of the volume for slotting decisions.
              </div>
            </div>
          </li>
          <li>
            <span className="dot dot-blue" />
            <div>
              <div className="list-title">Channel performance</div>
              <div className="list-sub">
                Compare conversion, order size, and return rates by channel.
              </div>
            </div>
          </li>
          <li>
            <span className="dot dot-blue" />
            <div>
              <div className="list-title">Warehouse efficiency score</div>
              <div className="list-sub">
                Composite metric blending pick rate, dock-to-stock, and accuracy.
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Throughput trend (mock)</h2>
          <span className="pill">Orders per week</span>
        </div>
        <div className="chart-placeholder">
          <p className="paragraph">
            Simple placeholder where a line chart component (e.g., Recharts) could show orders
            shipped vs received over time.
          </p>
        </div>
      </div>
    </section>
  );
}

function ForecastingSection() {
  return (
    <section className="content-grid single">
      <div className="card">
        <div className="card-header">
          <h2>AI demand forecasting</h2>
        </div>
        <p className="paragraph">
          Simulated controls to represent how models could tune for seasonality, promotions, and
          lead times.
        </p>
        <div className="content-grid">
          <div>
            <label className="field-label">Seasonality sensitivity</label>
            <input type="range" min="0" max="100" defaultValue="70" />
            <label className="field-label">Promotion uplift factor</label>
            <input type="range" min="0" max="100" defaultValue="40" />
            <label className="field-label">Supplier lead time (days)</label>
            <input className="input-like" type="number" defaultValue="18" />
          </div>
          <div className="forecast-panel">
            <div className="forecast-stat">
              <span className="forecast-label">Projected stockout risk</span>
              <span className="forecast-value">Low</span>
            </div>
            <div className="forecast-stat">
              <span className="forecast-label">Recommended safety stock</span>
              <span className="forecast-value">+12%</span>
            </div>
            <div className="forecast-note">
              Adjust sliders to demo how advisory recommendations could change before peak events.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortalSection() {
  return (
    <section className="content-grid">
      <div className="card">
        <div className="card-header">
          <h2>Client workspace</h2>
        </div>
        <p className="paragraph">
          Secure area where clients review KPIs, download playbooks, and request workflow changes.
        </p>
        <form className="portal-form">
          <label className="field-label">Start a new engagement brief</label>
          <input className="input-like" type="text" placeholder="e.g., Q4 peak readiness" />
          <label className="field-label">Primary objective</label>
          <select className="input-like">
            <option>Improve pick speed</option>
            <option>Reduce stockouts</option>
            <option>Reduce carrying cost</option>
            <option>Multi-warehouse rollout</option>
          </select>
          <label className="field-label">Notes for consultant</label>
          <textarea
            className="input-like"
            rows={4}
            placeholder="Share current pain points, constraints, and timelines."
          />
          <button type="button" className="primary-btn">
            Submit to WareWeGo
          </button>
        </form>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Engagement timeline</h2>
        </div>
        <ol className="timeline">
          <li>
            <span className="timeline-dot" />
            <div>
              <div className="timeline-title">Discovery & data audit</div>
              <div className="timeline-sub">
                Connect WMS, ERP, marketplaces, and shipping data sources.
              </div>
            </div>
          </li>
          <li>
            <span className="timeline-dot" />
            <div>
              <div className="timeline-title">Warehouse walk-through</div>
              <div className="timeline-sub">
                Map current flows from receiving to outbound, highlight waste.
              </div>
            </div>
          </li>
          <li>
            <span className="timeline-dot" />
            <div>
              <div className="timeline-title">Design & pilot</div>
              <div className="timeline-sub">
                Configure dashboards, forecasting models, and layout changes.
              </div>
            </div>
          </li>
          <li>
            <span className="timeline-dot" />
            <div>
              <div className="timeline-title">Rollout & training</div>
              <div className="timeline-sub">
                Coach teams and monitor KPIs to lock in improvements.
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

/** MAIN APP WITH TABS **/

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderSection = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewSection />;
      case "wms":
        return <WmsSection />;
      case "analytics":
        return <AnalyticsSection />;
      case "forecasting":
        return <ForecastingSection />;
      case "portal":
        return <PortalSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">W</div>
          <div className="logo-text">
            <span className="logo-title">WareWeGo</span>
            <span className="logo-subtitle">Warehouse Portal</span>
          </div>
        </div>
        <nav className="nav">
          <button
            className={
              activeTab === "overview" ? "nav-item nav-item-active" : "nav-item"
            }
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={activeTab === "wms" ? "nav-item nav-item-active" : "nav-item"}
            onClick={() => setActiveTab("wms")}
          >
            WMS
          </button>
          <button
            className={
              activeTab === "analytics" ? "nav-item nav-item-active" : "nav-item"
            }
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
          <button
            className={
              activeTab === "forecasting" ? "nav-item nav-item-active" : "nav-item"
            }
            onClick={() => setActiveTab("forecasting")}
          >
            Forecasting
          </button>
          <button
            className={activeTab === "portal" ? "nav-item nav-item-active" : "nav-item"}
            onClick={() => setActiveTab("portal")}
          >
            Client Portal
          </button>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>Warehouse inventory overview</h1>
            <p>Snapshot of stock health, movement, and consulting touchpoints.</p>
          </div>
          <div className="filters">
            <select>
              <option>All warehouses</option>
              <option>WH-01</option>
              <option>WH-02</option>
            </select>
            <select>
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Today</option>
            </select>
          </div>
        </header>

        {renderSection()}
      </main>
    </div>
  );
}

export default App;

