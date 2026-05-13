export default function TeamMemberFields({
    assignedTeam,
    handleTeamChange,
    addTeamMember,
  }) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            Team Members
          </h3>
  
          <button
            type="button"
            onClick={addTeamMember}
            className="text-sm text-primary"
          >
            + Add Member
          </button>
        </div>
  
        {assignedTeam.map(
          (member, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-3"
            >
              <input
                type="text"
                placeholder="Name"
                className="input"
                onChange={(e) =>
                  handleTeamChange(
                    index,
                    "name",
                    e.target.value
                  )
                }
              />
  
              <input
                type="text"
                placeholder="Role"
                className="input"
                onChange={(e) =>
                  handleTeamChange(
                    index,
                    "role",
                    e.target.value
                  )
                }
              />
  
              <input
                type="text"
                placeholder="Phone"
                className="input"
                onChange={(e) =>
                  handleTeamChange(
                    index,
                    "phone",
                    e.target.value
                  )
                }
              />
            </div>
          )
        )}
      </div>
    );
  }