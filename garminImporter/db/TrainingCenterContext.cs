using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace garminImporter.db
{
    public class TrainingCenterContext : DbContext
    {
        public DbSet<TrainingCenterDatabase_t> TrainingCenterDatabase_t { get; set; }
        public DbSet<Folders_t> Folders_t { get; set; }
        public DbSet<History_t> History_t { get; set; }
        public DbSet<HistoryFolder_t> HistoryFolder_t { get; set; }
        public DbSet<ActivityReference_t> ActivityReference_t { get; set; }
        public DbSet<CoursePoint_t> CoursePoint_t { get; set; }
        public DbSet<Position_t> Position_t { get; set; }
        //public DbSet<CoursePointType_t> CoursePointType_t { get; set; }
        public DbSet<Extensions_t> Extensions_t { get; set; }
        public DbSet<CourseLap_t> CourseLap_t { get; set; }
        public DbSet<HeartRateInBeatsPerMinute_t> HeartRateInBeatsPerMinute_t { get; set; }
        public DbSet<HeartRateValue_t> HeartRateValue_t { get; set; }
        public DbSet<HeartRateAsPercentOfMax_t> HeartRateAsPercentOfMax_t { get; set; }
        //public DbSet<Intensity_t> Intensity_t { get; set; }
        public DbSet<Course_t> Course_t { get; set; }
        public DbSet<Trackpoint_t> Trackpoint_t { get; set; }
        //public DbSet<SensorState_t> SensorState_t { get; set; }
        public DbSet<AbstractSource_t> AbstractSource_t { get; set; }
        public DbSet<Application_t> Application_t { get; set; }
        public DbSet<Build_t> Build_t { get; set; }
        public DbSet<Version_t> Version_t { get; set; }
        //public DbSet<BuildType_t> BuildType_t { get; set; }
        public DbSet<Device_t> Device_t { get; set; }
        public DbSet<Zone_t> Zone_t { get; set; }
        public DbSet<CustomHeartRateZone_t> CustomHeartRateZone_t { get; set; }
        public DbSet<PredefinedHeartRateZone_t> PredefinedHeartRateZone_t { get; set; }
        public DbSet<CustomSpeedZone_t> CustomSpeedZone_t { get; set; }
        //public DbSet<SpeedType_t> SpeedType_t { get; set; }
        public DbSet<PredefinedSpeedZone_t> PredefinedSpeedZone_t { get; set; }
        public DbSet<Target_t> Target_t { get; set; }
        public DbSet<None_t> None_t { get; set; }
        public DbSet<Cadence_t> Cadence_t { get; set; }
        public DbSet<HeartRate_t> HeartRate_t { get; set; }
        public DbSet<Speed_t> Speed_t { get; set; }
        public DbSet<Duration_t> Duration_t { get; set; }
        public DbSet<UserInitiated_t> UserInitiated_t { get; set; }
        public DbSet<CaloriesBurned_t> CaloriesBurned_t { get; set; }
        public DbSet<HeartRateBelow_t> HeartRateBelow_t { get; set; }
        public DbSet<HeartRateAbove_t> HeartRateAbove_t { get; set; }
        public DbSet<Distance_t> Distance_t { get; set; }
        public DbSet<Time_t> Time_t { get; set; }
        public DbSet<AbstractStep_t> AbstractStep_t { get; set; }
        public DbSet<Step_t> Step_t { get; set; }
        public DbSet<Repeat_t> Repeat_t { get; set; }
        public DbSet<Workout_t> Workout_t { get; set; }
        //public DbSet<Sport_t> Sport_t { get; set; }
        public DbSet<NextSport_t> NextSport_t { get; set; }
        public DbSet<ActivityLap_t> ActivityLap_t { get; set; }
        //public DbSet<TriggerMethod_t> TriggerMethod_t { get; set; }
        public DbSet<Activity_t> Activity_t { get; set; }
        public DbSet<Training_t> Training_t { get; set; }
        public DbSet<QuickWorkout_t> QuickWorkout_t { get; set; }
        public DbSet<Plan_t> Plan_t { get; set; }
        //public DbSet<TrainingType_t> TrainingType_t { get; set; }
        public DbSet<FirstSport_t> FirstSport_t { get; set; }
        public DbSet<MultiSportSession_t> MultiSportSession_t { get; set; }
        public DbSet<ActivityList_t> ActivityList_t { get; set; }
        public DbSet<CourseFolder_t> CourseFolder_t { get; set; }
        public DbSet<NameKeyReference_t> NameKeyReference_t { get; set; }
        public DbSet<Courses_t> Courses_t { get; set; }
        public DbSet<WorkoutFolder_t> WorkoutFolder_t { get; set; }
        public DbSet<Workouts_t> Workouts_t { get; set; }
        public DbSet<MultiSportFolder_t> MultiSportFolder_t { get; set; }
        public DbSet<Week_t> Week_t { get; set; }
    }
}
