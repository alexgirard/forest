class InfectionsController < ApplicationController 
  def create 
    infection = Infection.new
    infection.start = Time.now
    infection.incubation = params[:infection][:incubation]
    infection.hai = params[:infection][:hai]
    infection.status = params[:infection][:status]
    patient = Patient.find_by(hospital_id: params[:infection][:patient_id])
    infection.patient = patient
    infection.save!

    # Find staff in contact with the infected patient
    rooms = patient.rooms_since(infection.start, infection.incubation)
    end_date = infection.start - 2.days

    contact_staff = Array.new

    rooms.each do |r|
      entries = Entry.where(room_id: r.id, time: end_date..infection.start)
      entries.each do |e|
        s = e.staff
        byebug
        if params[:infection][:status] == ('Confirmed')
          s.exposure = "Confirmed"
        elsif params[:infection][:status] == ('Suspected')
          s.exposure = "Suspected"
        end
        s.save!
        contact_staff << s
      end
    end

    contact_staff = contact_staff.uniq

    render(json: contact_staff)
  end

  def show 
    infection = Infection.find(params[:id])
    render component: 'InfectionDetails', props: {infection: infection}
  end

  def update 
    infection = Infection.find(params[:id])
    infection.update_attributes(params.require(:infection).permit(:notes, :start, :incubation, :steps, :hai, :status))
    redirect_to dashboard_path
  end

  def destroy 
    infection = Infection.find(params[:id])
    infection.destroy
    redirect_to dashboard_path
  end
end