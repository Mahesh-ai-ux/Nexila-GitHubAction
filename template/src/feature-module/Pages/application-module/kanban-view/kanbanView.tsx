import {
  Joinstatus,
  Categorys,
  Currency,
  Industry,
  Lookingfor,
  Source,
  Internshipduration,
} from "../../../../core/json/selectOption";
import CommonSelect from "../../../../components/common-select/commonSelect";

import { useState, useEffect } from "react";
import { createLeadPublic } from "../../../../api/leadApi"; //nexila changes
// import axios from "axios";
// import API_URL from "../../../../api/apiconfig";
// import PageHeader from "../../../../components/page-header/pageHeader";


interface Lead {
  _id?: string;
  name?: string;
  phone?: string;
  email?: string;
  leadstatus?: string;
  leadsource?: string;
  collegename?: string;
  category?: string;
  location?: string;
  domain?: string;
  graduate?: string;
  joinstatus?: string;
  lookingfor?: string;
  internshipduration?: string;

}

interface ModalLeadsProps {
  selectedLead?: Lead | null;
  actionType?: "edit" | "delete" | null;
  onUpdate?: () => void;
}

const KanbanView: React.FC<ModalLeadsProps> = ({
  selectedLead: _selectedLead = null,
  actionType: _actionType = "",
  onUpdate = async () => { },
}) => {

  // const [leadStatusOptions, setLeadStatusOptions] = useState([]);



  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<Lead>({
    name: "",
    phone: "",
    email: "",
    collegename: "",
    location: "",
    category: "",
    leadsource: "",
    leadstatus: "",
    domain: "",
    graduate: "",
    joinstatus: "",
    lookingfor: "",
    internshipduration: "",

  });
  //Leadstaus option getting
  // useEffect(() => {
  //   const fetchLeadStatuses = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const res = await axios.get(`${API_URL}/leadstatus`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       // Convert backend data to dropdown-friendly format
  //       const formatted = res.data.map((item:any) => ({
  //         value: item.name,
  //         label: item.name,
  //       }));

  //       setLeadStatusOptions(formatted);
  //        // 👉 Auto assign first leadstatus as default
  //     if (formatted.length > 0) {
  //       setFormData((prev) => ({
  //         ...prev,
  //         leadstatus: formatted[0].value,
  //       }));
  //     }
  //     } catch (err) {
  //       console.error("Error fetching lead statuses", err);
  //     }
  //   };

  //   fetchLeadStatuses();
  // }, []);


  // ✅ Validate fields
  const validateForm = () => {
    const fieldsToIgnore = ["leadstatus", "internshipduration"];

    const missingFields: string[] = [];

    Object.entries(formData).forEach(([key, value]) => {
      if (!fieldsToIgnore.includes(key)) {
        if (!value || value.toString().trim() === "") {
          missingFields.push(key);
        }
      }
    });

    if (missingFields.length > 0) {
      alert("⚠️ Missing fields: " + missingFields.join(", "));
      return false;
    }

    return true;
  };
  // ✅ Handle text inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle selects (from CommonSelect)

  // For CommonSelect dropdowns:
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await createLeadPublic(formData); //nexila changes
      if (res.success) {
        alert("✅ Lead stored successfully!");
        console.log("Created lead:", res);
        // 🔹 Immediately refresh the list without page reload
        onUpdate();
        setFormData({
          name: "",
          phone: "",
          email: "",
          collegename: "",
          location: "",
          category: "",
          leadsource: "",
          leadstatus: "",
          domain: "",
          graduate: "",
          joinstatus: "",
          lookingfor: "",
          internshipduration: "",

        });
        window.location.href = "/login";
      } else {
        alert("❌ Failed to store lead: " + (res.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Frontend error creating lead:", err);
      alert("❌ Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);


  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow" style={{ width: "100%", maxWidth: "900px" }}>
        <div className="card-body p-4">

          <h3 className="text-center mb-3">Enquiry Form</h3>
          <p className="text-center text-muted mb-4">
            Fill the form and our team will contact you
          </p>

          <form onSubmit={handleSubmit}>
            <div className="row">

              {/* Full Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Phone */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Mobile Number *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Qualification */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Qualification *</label>
                <CommonSelect
                  name="graduate"
                  value={formData.graduate}
                  onChange={handleSelectChange}
                  options={Currency}
                />
              </div>

              {/* College */}
              <div className="col-md-6 mb-3">
                <label className="form-label">College Name *</label>
                <input
                  name="collegename"
                  value={formData.collegename}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Category */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Current Status *</label>
                <CommonSelect
                  name="category"
                  value={formData.category}
                  onChange={handleSelectChange}
                  options={Categorys}
                />
              </div>

              {/* Source */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Source *</label>
                <CommonSelect
                  name="leadsource"
                  value={formData.leadsource}
                  onChange={handleSelectChange}
                  options={Source}
                />
              </div>

              {/* Program */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Program Type *</label>
                <CommonSelect
                  name="lookingfor"
                  value={formData.lookingfor}
                  onChange={handleSelectChange}
                  options={Lookingfor}
                />
              </div>

              {/* Domain */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Field of Interest *</label>
                <CommonSelect
                  name="domain"
                  value={formData.domain}
                  onChange={handleSelectChange}
                  options={Industry}
                />
              </div>

              {/* Internship Duration */}
              {(formData.lookingfor === "Project with Internship" ||
                formData.lookingfor === "Internship") && (
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Internship Duration *</label>
                    <CommonSelect
                      name="internshipduration"
                      value={formData.internshipduration}
                      onChange={handleSelectChange}
                      options={Internshipduration}
                    />
                  </div>
                )}

              {/* Location */}
              <div className="col-md-6 mb-3">
                <label className="form-label">City *</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Joining */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Joining Timeline *</label>
                <CommonSelect
                  name="joinstatus"
                  value={formData.joinstatus}
                  onChange={handleSelectChange}
                  options={Joinstatus}
                />
              </div>

              {/* Submit */}
              <div className="col-12 text-center mt-3">
                <button
                  type="submit"
                  className="btn btn-primary px-5"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default KanbanView;
// *Enquiry Form Page*
// Full Name  DONE

// Mobile Number
// Email Address
// Qualification
// Institution Name
// Enquiry Source
// Current Status
// Program Type
// Field of Interest (Domain)
// City
// Joining Timeline



// *Current Status* - Dropdown
// Graduate – Job Seeker
// Working Professional – Technical
// Working Professional – Non-Technical
// College Student – Final Year
// College Student – (1st - Pre Final Year)